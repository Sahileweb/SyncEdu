const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const sendEmail = require('./utils/sendEmail');
const { storage } = require('./cloudinaryConfig');
const upload = multer({ storage: storage });

app.use(express.json());
// app.use("/uploads",express.static('uploads'));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


app.use(cors({
    origin:['http://localhost:3000',
           'http://localhost:5174',
           'http://localhost:5173',
           "https://sync-edu.vercel.app",
        ],
        credentials:true,
        methods:['GET','POST','PUT','DELETE'],
}));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB connected'))
.catch((err)=>console.log(err));


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },
})
 const admin = mongoose.model('admin',userSchema);


const taskSchema = new mongoose.Schema({
     title:{ 
        type:String,
         required:true,
         }, 
    description:{ 
        type:String, 
        required:true 
         },
    deadline:{ 
        type:Date, 
        required:true, }, 
    status:{ 
            type:String,
            enum:["Pending", "Completed", "Overdue"],
            default:'Pending',
             },
    questionPdf:{
             type:String,
             default:null,
             }, 
    answerPdf:{
             type:String,
             default:null,
             },          
    studentId:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'student', 
            require:true, 
        }, 
    createdBy:{
         type:mongoose.Schema.Types.ObjectId, 
         ref:'admin', 
         required:true,
         },
    isDeleted:{
        type:Boolean,
        default:false,
    } 
        },{ timestamps: true }) 

 const Task = mongoose.model('task',taskSchema);

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


const isAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};


const isSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Super Admin only" });
  }
  next();
};





const authStudent = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, JWT_SECRET);
    req.studentId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


 const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin',
    }    
 })
 const Student = mongoose.model('student',studentSchema);
 

app.post('/api/admin/student-signup', auth, isAdmin, async (req, res) => {
    const { email } = req.body;

    if (!gmailRegex.test(email)) {
        return res.status(400).json({
            message: "Only Gmail addresses (@gmail.com) are allowed",
        });
    }

    try {
        const { name, email, password } = req.body;
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) return res.status(400).json({ message: 'Student already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedpas = await bcrypt.hash(password, salt);

       
        const newstudent = new Student({
            name,
            email,
            password: hashedpas,
            createdBy: req.user.id,
        });
        await newstudent.save();

        const message = `
            <h3>Welcome to SyncEdu</h3>
            <p>Hello ${name},</p>
      
            <p>Your login credentials:</p>
            <ul>
                <li>Email: ${email}</li>
                <li>Password: ${password}</li>
            </ul>

            <p>Please login and change your password.</p>
            <p>Good luck with your tasks!</p>
        `;

        try {
            await sendEmail({
                email: email,
                subject: "SyncEdu Student Registration",
                message: message,
            });
            res.status(201).json({ message: 'Student registered and email sent successfully' });
        } catch (emailError) {
            console.log("Email error:", emailError);
            res.status(201).json({ message: 'Student registered, but email failed to send.' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/student/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        
        const studentexists = await Student.findOne({email});
        if(!studentexists) return res.status(400).json({message:'Student not found'});

        const ismatch = await bcrypt.compare(password,studentexists.password);
        if(!ismatch) return res.status(400).json({message:'invalid credentials'});

        const token = jwt.sign(
            {id:studentexists._id,role: 'student'},JWT_SECRET,{expiresIn:"1h"}
        );
        res.json({token,message:' student login successful'});
    }catch(err){
        res.status(500).json({message:'internal server error'});
    }
});



app.post('/api/admin/login',async (req,res)=>{
    const { email } = req.body;

  if (!gmailRegex.test(email)) {
    return res.status(400).json({
      message: "Admin email must end with @gmail.com",
    });
  }
    try{
        const {email,password}=req.body;
        
        const adminexixts = await admin.findOne({email});
        if(!adminexixts) return res.status(400).json({message:'admin not found.please signup '})

            const ismatch = await bcrypt.compare(password,adminexixts.password);
            if(!ismatch) return res.status(400).json({message:'invalid credentials'})

    

    const token = jwt.sign(
  {
    id: adminexixts._id,
    role: adminexixts.role,
  },
  JWT_SECRET,
  { expiresIn: "1h" }
);
    res.json({token,message:'admin login sucessfull'})

    }catch(err){
        res.status(500).json({message:'internal server error'});
    }

})


app.post("/api/superadmin/create-admin", auth, isSuperAdmin, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await admin.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        
        await admin.create({
            name,
            email,
            password: hashed,
            role: "admin",
        });

        const message = `
            <h3>Welcome to SyncEdu</h3>
            <p>Hello ${name},</p>
            <p>Your login credentials:</p>
            <ul>
                <li>Email: ${email}</li>
                <li>Password: ${password}</li>
            </ul>
            <p>Please login and change your password.</p>
        `;

        try {
            await sendEmail({
                email: email,
                subject: "SyncEdu Admin Login Credentials",
                message: message,
            });
            res.json({ message: "Admin created and email sent successfully" });
        } catch (emailError) {
            console.log("Email error:", emailError);
            res.json({ message: "Admin created, but email failed to send." });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/admin/dashboard', auth, isAdmin, (req, res) => {
    res.json({
         message: "Welcome Admin",
         adminId: req.user.id,
         role: req.user.role
    });
});

app.post('/api/admin/create-task', auth, isAdmin, upload.single('questionPdf'), async (req, res) => {
    try {
        const { title, description, deadline, studentId } = req.body;

        if (!title || !description || !deadline || !studentId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const deadlineDate = new Date(`${deadline}T00:00:00+05:30`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (deadlineDate <= today) {
            return res.status(400).json({ message: 'Deadline must be a future date' });
        }

       
        const questionUrl = req.file ? req.file.path : null;

        const newtask = new Task({
            title,
            description,
            deadline,
            status: 'Pending',
            studentId,
            createdBy: req.user.id,
            questionPdf: questionUrl, 
        });

        await newtask.save();

        res.status(201).json({ message: 'Task created successfully' });

        (async () => {
            try {
                const student = await Student.findById(studentId);
                if (student && questionUrl) {
                    const emailMessage = `
                        <h3>New Task Assigned: ${title}</h3>
                        <p>Hello ${student.name},</p>
                        <p>You have been assigned a new task by your admin.</p>
                        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Title:</strong> ${title}</p>
                            <p><strong>Deadline:</strong> ${new Date(deadline).toDateString()}</p>
                        </div>
                        <a href="${questionUrl}">Download Question PDF</a>
                    `;
                    
                    await sendEmail({
                        email: student.email,
                        subject: `New Task Assigned: ${title}`,
                        message: emailMessage,
                    });
                    console.log(`Email sent to ${student.email}`);
                }
            } catch (emailErr) {
                
                console.error("Background email failed:", emailErr.message);
            }
        })();

    } catch (err) {
        console.error("Create Task Error:", err);
        
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    }
});

const answerUploadPath = path.resolve(__dirname, 'uploads', 'answers');


if (!fs.existsSync(answerUploadPath)) {
  try {
    fs.mkdirSync(answerUploadPath, { recursive: true });
    console.log("✅ Created missing folder:", answerUploadPath);
  } catch (error) {
    console.error("❌ Error creating folder:", error);
  }
}

const answerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, answerUploadPath);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, '-');
    cb(null, Date.now() + '-' + cleanName);
  },
});

const uploadAnswer = multer({
  storage: answerStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

app.get('/api/student/task',authStudent,async(req,res)=>{
    try{

        await Task.updateMany({
            studentId:req.studentId,
            deadline:{$lt:new Date()},
            status:'Pending',
        },{
            $set:{status:"Overdue"}
        }
       
    );
        
        const tasks = await Task.find({studentId:req.studentId, isDeleted: { $ne: true }}).sort({deadline:1});
        res.json(tasks);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

app.post('/api/student/task/:id/upload-answer', authStudent, upload.single('answerPdf'), async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const task = await Task.findOne({
            _id: req.params.id,
            studentId: req.studentId,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.answerPdf = req.file.path; 
     
        await task.save();

        res.json({ 
            message: 'Answer uploaded successfully', 
            answerUrl: task.answerPdf 
        });

    } catch (err) {
        console.error('Upload Answer Error:', err);
        res.status(500).json({ message: err.message });
    }
});


app.put('/api/student/task/:id',authStudent,async(req,res)=>{
    try{
         if (req.body.status !== "Completed") {
    return res.status(400).json({ message: "Invalid update" });
  }

  const task = await Task.findOne({
    _id: req.params.id,
    studentId: req.studentId,
    status: "Pending", 
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found or locked" });
  }

  task.status = "Completed";
  await task.save();

  res.json({ message: "Task marked as completed" });
    }catch(err){
        res.status(500).json({message:'internal server errorsss'});
    }
});


exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    const newAdmin = await User.create({
      name,
      email,
      password, 
      role: 'admin'
    });

    const message = `
      <h1>Welcome to SyncEdu</h1>
      <p>Hello ${name},</p>
      <p>You have been added as an <strong>Admin</strong>.</p>
      <p>Your login credentials are:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please login and change your password immediately.</p>
    `;

    try {
      await sendEmail({
        email: newAdmin.email,
        subject: 'SyncEdu Admin Login Credentials',
        message: message,
      });
      
      res.status(201).json({
        success: true,
        data: newAdmin,
        message: 'Admin created and email sent successfully.'
      });
    } catch (emailError) {
      
      console.error(emailError);
      return res.status(500).json({ 
        success: false, 
        message: 'User created, but email could not be sent.' 
      });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

app.get('/api/admin/tasks',auth, isAdmin,async(req,res)=>{
    try{
        const tasks = await Task.find({ isDeleted: false })
    .populate("studentId", "name email")
    .sort({ deadline: -1 });

  const formattedTasks = tasks.map((task) => {
    let adminStatus = task.status;

    if (task.status === "Overdue") {
      adminStatus = "Not Submitted";
    }

    return {
      ...task.toObject(),
      adminStatus,
    };
  });

  res.json(formattedTasks);
       }catch(err){
    res.status(500).json({message:err.message});
       }
});

app.get('/api/admin/stats', auth, isAdmin, async (req, res) => {
  try {
    const stats = await Task.aggregate([
          {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $addFields: {
          adminStatus: {
            $cond: [
              { $eq: ["$status", "Overdue"] },
              "Not Submitted",
              "$status"
            ]
          }
        }
      },
      {
        $facet: {
          pieChartData: [
            {
              $group: {
                _id: "$adminStatus",   // ✅ FIXED
                value: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                value: 1
              }
            }
          ],
          lineChartData: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                     timezone: "Asia/Kolkata"
                  }
                },
                tasksAssigned: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ]
        }
      }
    ]);

    res.status(200).json(stats[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.delete('/api/admin/tasks/:id',auth, isAdmin,async(req,res)=>{
    
        const task = await Task.findByIdAndUpdate(req.params.id ,
                                              { isDeleted: true },
                                               { new: true })
        res.json({message:'Task Deleted '});  
})
app.delete('/api/admin/students/:id',auth, isAdmin,async(req,res)=>{
    
        const students = await Student.findByIdAndDelete(req.params.id)
        res.json({message:'Student Deleted '});  
       
})

app.put('/api/students/change-password',authStudent,async(req,res)=>{
    try{
        const{oldPassword,newPassword}=req.body;
         if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields aree required" });
    }
        const student = await Student.findById(req.studentId);
        
        const ismatch = await bcrypt.compare(oldPassword,student.password)
        if(!ismatch) return res.status(400).json({message:'password incorrect'});

       student.password = await bcrypt.hash(newPassword,10);
       await student.save();

       res.json({message:'password updated successfully'});
      }catch(err){
        res.status(500).json({message:err.message});
      }
})

app.put('/api/admin/change-password', auth, isAdmin, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminUser = await admin.findById(req.user.id);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    adminUser.password = await bcrypt.hash(newPassword, 10);
    await adminUser.save();

    res.json({ message: "Admin password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/admin/get-students', auth, isAdmin, async (req, res) => {
    try {
        const students = await Student.find({ createdBy: req.user.id })
            .select('-password'); // hide password

        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/api/admin/get-tasks', auth, isAdmin, async (req, res) => {
    try {
        
        const tasks = await Task.find({ createdBy: req.user.id, isDeleted: { $ne: true } })
            .populate('studentId', 'name')
            .sort({ createdAt: -1 });
            res.json(tasks);
         
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
});

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      email: "yourtestemail@gmail.com",
      subject: "Resend Test",
      message: "<h1>This is a test email from Resend</h1>",
    });
    res.send("Email sent successfully!");
  } catch (err) {
    console.error("Test email failed:", err);
    res.status(500).send("Error sending email");
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



