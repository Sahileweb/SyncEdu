const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Sanitize the name (replace spaces with underscores)
    // Example: "Math Homework.pdf" -> "Math_Homework"
    const cleanFileName = file.originalname.split('.')[0].replace(/\s+/g, '_');

    return {
      folder: 'syncedu-assignments',
      
      // ⚠️ IMPORTANT: This allows PDFs to be uploaded
      resource_type: 'raw', 
      
      // ⚠️ CRITICAL FIX: We manually add '.pdf' to the public_id
      // This ensures the final URL ends in .pdf
      public_id: `${cleanFileName}.pdf`, 
      
      // Settings to prevent random characters
      use_filename: true,
      unique_filename: false, 
      overwrite: true,
    };
  },
});

module.exports = { storage };