//  import { useState, useEffect } from 'react';
//  import { Calendar, Clock, CheckCircle2, Folder, Eye,AlertCircle } from 'lucide-react';
//  import DashboardLayout from '../../components/Layout/DashboardLayout';
//  import api from '../../lib/api';

//  interface Task {
//    _id: string;
//    title: string;
//    description: string;
//    deadline: string;
//    status: 'Pending' | 'Completed' | 'Overdue';
//     questionPdf?: string | null;
//  }

//  type FilterStatus = 'All' | 'Pending'  | 'Completed' | 'Overdue';

//  export default function StudentDashboard() {
//    const [tasks, setTasks] = useState<Task[]>([]);
//    const [loading, setLoading] = useState(true);
//    const [filter, setFilter] = useState<FilterStatus>('All');
//    const [message, setMessage] = useState({ type: '', text: '' });

//    useEffect(() => {
//      fetchTasks();
//    }, []);

//    const fetchTasks = async () => {
//      try {
//        const response = await api.get('/student/task');
//        setTasks(response.data);
//      } catch (err) {
//        console.error('Error fetching tasks:', err);
//      } finally {
//        setLoading(false);
//      }
//    };

//   const handleStatusUpdate = async (taskId: string) => {
//    try {
//      await api.put(`/student/task/${taskId}`, { status: 'Completed' });
//      setMessage({ type: 'success', text: 'Task marked as completed!' });
//      fetchTasks();
//      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//    } catch (err: any) {
//      setMessage({
//        type: 'error',
//        text: err.response?.data?.message || 'Failed to update task',
//      });
//    }
//  };


//    const filteredTasks = tasks.filter((task) => {
//      if (filter === 'All') return true;
//      return task.status === filter;
//    });

//    const getStatusColor = (status: Task['status']) => {
//      switch (status) {
//        case 'Completed':
//          return 'bg-green-100 text-green-700';
//        case 'Overdue':
//          return 'bg-red-100 text-red-700';
//        default:
//          return 'bg-yellow-100 text-yellow-700';
//      }
//    };

//    const getStatusIcon = (status: Task['status']) => {
//    switch (status) {
//      case 'Completed':
//        return <CheckCircle2 className="w-5 h-5" />;
//      case 'Overdue':
//        return <AlertCircle className="w-5 h-5" />;
//      default:
//        return <Clock className="w-5 h-5" />;  Pending
//    }
//  };


//    const formatDate = (dateString: string) => {
//      return new Date(dateString).toLocaleDateString('en-IN', {
//        month: 'short',
//        day: 'numeric',
//        year: 'numeric',
//      });
//    };

//    const filters: FilterStatus[] = ['All', 'Pending', 'Completed', 'Overdue'];

//    return (
//      <DashboardLayout>
//        <div className="max-w-6xl mx-auto">
//          <div className="mb-8">
//            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
//            <p className="text-gray-600 mt-2">Track and manage your assignments</p>
//          </div>

//          {message.text && (
//            <div
//              className={`mb-6 p-4 rounded-xl ${
//                message.type === 'success'
//                  ? 'bg-green-50 text-purple-700'
//                  : 'bg-red-50 text-red-700'
//              }`}
//            >
//              {message.text}
//            </div>
//          )}

//          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
//            <div className="flex flex-wrap gap-3">
//              {filters.map((filterOption) => (
//                <button
//                  key={filterOption}
//                  onClick={() => setFilter(filterOption)}
//                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
//                    filter === filterOption
//                      ? 'bg-purple-600 text-white'
//                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                  }`}
//                >
//                  {filterOption}
//                  {filterOption === 'All' && ` (${tasks.length})`}
//                  {filterOption !== 'All' &&
//                    ` (${tasks.filter((t) => t.status === filterOption).length})`}
//                </button>
//              ))}
//            </div>
//          </div>

//          {loading ? (
//            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
//              Loading tasks...
//            </div>
//          ) : filteredTasks.length === 0 ? (
//            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
//              {filter === 'All' ? 'No tasks assigned yet' : `No ${filter.toLowerCase()} tasks`}
//            </div>
//          ) : (
//            <div className="space-y-4">
//              {filteredTasks.map((task) => (
//                <div
//                  key={task._id}
//                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                >
//                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                    <div className="flex-1">
//                      <div className="flex items-start gap-3 mb-3">
//                        <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
//                          {getStatusIcon(task.status)}
//                        </div>
//                        <div className="flex-1">
//                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                            {task.title}
//                          </h3>
//                          <p className="text-gray-600">{task.description}</p>
//                        </div>
//                      </div>

//                      <div className="flex items-center gap-2 text-sm text-gray-500 ml-14">
//                        <Calendar className="w-4 h-4" />
//                        <span>Due: {formatDate(task.deadline)}</span>
//                      </div>
                    
//                    </div>
                  
//                    <div className="flex flex-col gap-3 md:items-end">
//                      <span
//                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                          task.status
//                        )}`}
//                      >
//                        {task.status}
//                      </span>

//                      <div className="flex flex-col gap-3 md:items-end">
//    {/* <span
//      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//        task.status
//      )}`}
//    >
//      {task.status}
//    </span> */}
  

//    {task.status === 'Pending' && (
//      <button
//        onClick={() => handleStatusUpdate(task._id)}
//        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
//      >
//        Mark as Completed
//      </button>
//    )}

//    {task.status === 'Completed' && (
//      <span className="text-sm text-green-600 font-medium">
//        ✔ Task completed
//      </span>
//    )}

//    {task.status === 'Overdue' && (
//      <span className="text-sm text-red-600 font-medium">
//        Deadline missed
//      </span>
//    )}
//  </div>

//                    </div>
//                  </div>
//                </div>
//              ))}
//            </div>
//          )}
//        </div>
//      </DashboardLayout>
//    );
//  }




import { useState, useEffect } from 'react';
import {Calendar,Clock,CheckCircle2,AlertCircle,X,Folder,Eye} from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import api from '../../lib/api';

interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  questionPdf?: string | null;
}

type FilterStatus = 'All' | 'Pending' | 'Completed' | 'Overdue';

export default function StudentDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [answerFile, setAnswerFile] = useState<File | null>(null);
const [uploading, setUploading] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/student/task');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId: string) => {
    try {
      await api.put(`/student/task/${taskId}`, { status: 'Completed' });
      setMessage({ type: 'success', text: 'Task marked as completed!' });
      fetchTasks();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update task',
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
const handleAnswerUpload = async () => {
  if (!answerFile || !selectedTask) return;

  const formData = new FormData();
  formData.append('answerPdf', answerFile);

  try {
    setUploading(true);
    await api.post(
      `/student/task/${selectedTask._id}/upload-answer`,
      formData,
      
    );

    setMessage({ type: 'success', text: 'Answer uploaded successfully' });
    setAnswerFile(null);
    fetchTasks();
  } catch (err: any) {
    setMessage({
      type: 'error',
      text: err.response?.data?.message || 'Upload failed',
    });
  } finally {
    setUploading(false);
  }
};

  const filters: FilterStatus[] = ['All', 'Pending', 'Completed', 'Overdue'];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-600 mb-8">Track and manage your assignments</p>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-2xl border-gray-100 p-6 mb-6">
          <div className="flex gap-3 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-medium ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-12 text-center rounded-xl">
            Loading tasks...
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => setSelectedTask(task)}
                className="bg-white rounded-2xl border-gray-300 p-6 hover:shadow-lg cursor-pointer"
              >
                <div className="flex gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-gray-600">
                      {task.description.length > 80
                        ? task.description.slice(0, 80) + '...'
                        : task.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center ml-14">
                  <span className="text-sm text-gray-500">
                    Due: {formatDate(task.deadline)}
                  </span>

                  <div className="flex flex-col gap-3 md:items-end">
                     <span
                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                         task.status
                       )}`}
                     >
                       {task.status}
                     </span>

                     <div className="flex flex-col gap-3 md:items-end">

                  {task.status === 'Pending' && (
                 <button
                   onClick={(e) => {
    e.stopPropagation();
    handleStatusUpdate(task._id);
  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                 >
                 Mark as Completed
                    </button>
                 )}

                {task.status === 'Completed' && (
                  <span className="text-sm text-green-600 font-medium">
                 ✔ Task completed
                </span>
                  )}

               {task.status === 'Overdue' && (
              <span className="text-sm text-red-600 font-medium">
               Deadline missed
               </span>
              )}
            </div>
          </div>
         </div>
        </div>
      ))}
     </div>
    )}
   </div>

        
      
      {/* ================= MODAL ================= */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-3">{selectedTask.title}</h2>
             
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-gray-700 whitespace-pre-wrap mb-6">
              {selectedTask.description}
            </p>
            <div className="flex flex-col justify-center gap-1 mb-4">
              <span
                className={`px-6 py-1 rounded-full text-sm ${getStatusColor(
                  selectedTask.status
                )}`}
              >
                {selectedTask.status}
              </span>
              <span className="text-sm text-gray-600">
                Due: {formatDate(selectedTask.deadline)}
              </span>
            </div>
            </div>

           

            {selectedTask.questionPdf && (
              <div className="p-4 bg-purple-50 flex items-center justify-between  border w-80 rounded-xl">
                
                <div className="flex items-center gap-2 text-sm text-gray-700">
                <Folder className="w-5 h-5 text-blue-600" />
                 <span className="font-bold">Question File</span>
                 </div>

                <div className=" ">
                  <a
                    href={`http://localhost:5000${selectedTask.questionPdf}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </a>
                </div>
              </div>
            )}
 
 {/* ===== Answer Upload ===== */}
{selectedTask.status === 'Pending' && (
  <div className="mt-6 space-y-4">
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          setAnswerFile(e.target.files[0]);
        }
      }}
      className="block w-full text-sm"
    />

    <button
      disabled={!answerFile || uploading}
      onClick={handleAnswerUpload}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
    >
      {uploading ? 'Uploading…' : 'Upload Answer'}
    </button>
  </div>
)}


             
            
          </div>
        </div>
      )}

     

    </DashboardLayout>
  );
}
