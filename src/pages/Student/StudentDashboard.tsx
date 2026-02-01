// import { useState, useEffect } from 'react';
// import { Calendar, Clock, TimerOff,CheckCircle2, AlertCircle, X, Folder, Eye, UploadCloud, FileText } from 'lucide-react';
// import DashboardLayout from '../../components/Layout/DashboardLayout';
// import api from '../../lib/api';

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   deadline: string;
//   status: 'Pending' | 'Completed' | 'Overdue';
//   questionPdf?: string | null;
//   answerPdf?: string | null;
// }

// type FilterStatus = 'All' | 'Pending' | 'Completed' | 'Overdue';

// export default function StudentDashboard() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState<FilterStatus>('All');
//   const [message, setMessage] = useState({ type: '', text: '' });
  
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [answerFile, setAnswerFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await api.get('/student/task');
//       setTasks(response.data);
//       return response.data; 
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (taskId: string) => {
//     try {
//       await api.put(`/student/task/${taskId}`, { status: 'Completed' });
//       setMessage({ type: 'success', text: 'Task marked as completed!' });
      
//       // Update local state immediately
//       const updatedTasks = tasks.map(t => t._id === taskId ? { ...t, status: 'Completed' } : t);
//       setTasks(updatedTasks as Task[]);
      
//       // Update modal view
//       if (selectedTask) {
//         setSelectedTask(prev => prev ? { ...prev, status: 'Completed' } : null);
//       }

//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update task' });
//     }
//   };

//   const handleAnswerUpload = async () => {
//     if (!answerFile || !selectedTask) return;

//     const formData = new FormData();
//     formData.append('answerPdf', answerFile);

//     try {
//       setUploading(true);
      
//       // 1. Upload
//       await api.post(
//         `/student/task/${selectedTask._id}/upload-answer`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setMessage({ type: 'success', text: 'Answer uploaded successfully' });
//       setAnswerFile(null);
      
//       // 2. Refresh Data
//       const latestTasks = await fetchTasks();
      
//       // 3. Update Modal
//       const updatedTask = latestTasks.find((t: Task) => t._id === selectedTask._id);
//       if (updatedTask) setSelectedTask(updatedTask);

//     } catch (err: any) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed' });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'All') return true;
//     return task.status === filter;
//   });

//   const getStatusColor = (status: Task['status']) => {
//     switch (status) {
//       case 'Completed': return 'bg-green-100 text-green-700';
//       case 'Overdue': return 'bg-red-100 text-red-700';
//       default: return 'bg-yellow-100 text-yellow-700';
//     }
//   };

//   const getStatusIcon = (status: Task['status']) => {
//     switch (status) {
//       case 'Completed': return <CheckCircle2 className="w-5 h-5" />;
//       case 'Overdue': return <AlertCircle className="w-5 h-5" />;
//       default: return <Clock className="w-5 h-5" />;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       month: 'short', day: 'numeric', year: 'numeric',
//     });
//   };

//   const filters: FilterStatus[] = ['All', 'Pending', 'Completed', 'Overdue'];


//   const renderAnswerSection = () => {
//     if (!selectedTask) return null;

//     // 1. If Task is COMPLETED -> Show "Completed" Status (NO Upload Box)
//     if (selectedTask.status === 'Completed') {
//         return (
//             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
//                 <div className="flex justify-center mb-2">
//                     <CheckCircle2 className="w-10 h-10 text-green-600" />
//                 </div>
//                 <h3 className="text-gray-900 font-bold text-lg">Task Completed</h3>
//                 <p className="text-sm text-gray-500 mb-4">You have finished this assignment.</p>
                
//                 {selectedTask.answerPdf && (
//                     <a
//                         href={`http://localhost:5000${selectedTask.answerPdf}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
//                     >
//                         <FileText className="w-4 h-4" /> View My Submission
//                     </a>
//                 )}
//             </div>
//         );
//     }

//     if(selectedTask.status === 'Overdue') {
//          return (
//           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
//             <div className="flex justify-center mb-2"> 
//               <TimerOff className="w-10 h-10 text-red-600 " />
//             </div>
//             <h3 className="text-gray-900 font-bold text-lg">Task Overdued</h3>
//             <p className="text-sm text-gray-500 mb-4">You cannot submit this task now.</p>
//           </div>
//         );
//     }

//     // 2. If Task is PENDING + ANSWER UPLOADED -> Show "Finalize" Button
//     if (selectedTask.answerPdf) {
//         return (
//             <div className="space-y-4">
//                 <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-green-100 rounded-lg">
//                             <FileText className="w-5 h-5 text-green-700" />
//                         </div>
//                         <div>
//                             <p className="font-semibold text-gray-900">Answer Uploaded</p>
//                             <p className="text-xs text-green-700">Ready to submit</p>
//                         </div>
//                     </div>
//                     <a
//                         href={`http://localhost:5000${selectedTask.answerPdf}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-green-700 hover:underline text-sm font-medium"
//                     >
//                         View File
//                     </a>
//                 </div>

//                 <button
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleStatusUpdate(selectedTask._id);
//                     }}
//                     className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-2"
//                 >
//                     <CheckCircle2 className="w-5 h-5" />
//                     Finalize & Mark as Completed
//                 </button>
//             </div>
//         );
//     }

//     // 3. If Task is PENDING + NO ANSWER -> Show Upload Box
//     return (
//         <div className="space-y-4">
//             <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded-lg border border-amber-100 flex gap-2 items-start">
//                 <AlertCircle className="w-5 h-5 shrink-0" />
//                 <p>Please upload your answer PDF <strong>before</strong> marking this task as completed.</p>
//             </div>

//             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <UploadCloud className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500" />
//                     <p className="mb-2 text-sm text-gray-500">
//                         <span className="font-semibold">Click to upload answer</span>
//                     </p>
//                     <p className="text-xs text-gray-500">PDF files only</p>
//                 </div>
//                 <input 
//                     type="file" 
//                     className="hidden" 
//                     accept="application/pdf"
//                     onChange={(e) => {
//                         if (e.target.files && e.target.files[0]) {
//                             setAnswerFile(e.target.files[0]);
//                         }
//                     }}
//                 />
//             </label>

//             {answerFile && (
//                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
//                     <div className="flex items-center gap-2 overflow-hidden">
//                         <FileText className="w-4 h-4 text-blue-600 shrink-0" />
//                         <span className="text-sm text-gray-600 truncate">{answerFile.name}</span>
//                     </div>
//                     <button onClick={() => setAnswerFile(null)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
//                 </div>
//             )}

//             <button
//                 disabled={!answerFile || uploading}
//                 onClick={handleAnswerUpload}
//                 className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-200"
//             >
//                 {uploading ? 'Uploading...' : 'Step 1: Upload Answer PDF'}
//             </button>
//         </div>
//     );
//   };

//   return (
//     <DashboardLayout>
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
//         <p className="text-gray-600 mb-8">Track and manage your assignments</p>

//         {message.text && (
//           <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Filter Buttons */}
//         <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
//           <div className="flex gap-2 flex-wrap">
//             {filters.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
//                   filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Task Grid */}
//         {loading ? (
//           <div className="text-center py-12 text-gray-500">Loading tasks...</div>
//         ) : (
//           <div className="space-y-4">
//             {filteredTasks.map((task) => (
//               <div
//                 key={task._id}
//                 onClick={() => { setSelectedTask(task); setAnswerFile(null); }}
//                 className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
//               >
//                 <div className="flex gap-4">
//                   <div className={`p-3 h-fit rounded-xl ${getStatusColor(task.status)}`}>
//                     {getStatusIcon(task.status)}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
//                         {task.status}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                    
//                     <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
//                       <div className="flex items-center gap-4">
//                          <span>Due: {formatDate(task.deadline)}</span>
//                          {task.answerPdf && (
//                            <span className="flex items-center gap-1 text-green-600 font-medium">
//                              <FileText className="w-4 h-4" /> Answer Submitted
//                            </span>
//                          )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
            
//             {filteredTasks.length === 0 && (
//                 <div className="text-center py-10 text-gray-400">No tasks found</div>
//             )}
//           </div>
//         )}
//       </div>

//       {selectedTask && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
//             {/* Modal Header */}
//             <div className="p-6 border-b border-gray-100 flex justify-between items-start">
//                <div>
//                   <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
//                   <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
//                     <Calendar className="w-4 h-4" /> Due {formatDate(selectedTask.deadline)}
//                   </div>
//                </div>
//                <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                  <X className="w-6 h-6 text-gray-500" />
//                </button>
//             </div>

          
//             <div className="p-6 overflow-y-auto">
//               <div className="prose text-gray-600 mb-6 whitespace-pre-wrap">
//                  {selectedTask.description}
//               </div>

//               {selectedTask.questionPdf && (
//                 <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                         <Folder className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                         <p className="font-semibold text-gray-900">Problem Statement</p>
//                         <p className="text-xs text-blue-600">PDF Document</p>
//                     </div>
//                   </div>
//                   <a
//                     href={`http://localhost:5000${selectedTask.questionPdf}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
//                   >
//                     <Eye className="w-4 h-4" /> View
//                   </a>
//                 </div>
//               )}

//               <hr className="my-6 border-gray-100" />

//               {/* === ANSWER SECTION (New Logic) === */}
//               <h3 className="font-semibold text-gray-900 mb-4">Your Submission</h3>
              
//               {renderAnswerSection()}

//             </div>

//             <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
//                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
//                   Status: {selectedTask.status}
//                </span>
//             </div>

//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }


import { useState, useEffect } from 'react';
import { Calendar, Clock, TimerOff, CheckCircle2, AlertCircle, X, Folder, Eye, UploadCloud, FileText } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import api from '../../lib/api';

interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  questionPdf?: string | null;
  answerPdf?: string | null;
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
      return response.data;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId: string) => {
    try {
      await api.put(`/student/task/${taskId}`, { status: 'Completed' });
      setMessage({ type: 'success', text: 'Task marked as completed!' });

      // Update local state immediately
      const updatedTasks = tasks.map(t => t._id === taskId ? { ...t, status: 'Completed' } : t);
      setTasks(updatedTasks as Task[]);

      // Update modal view
      if (selectedTask) {
        setSelectedTask(prev => prev ? { ...prev, status: 'Completed' } : null);
      }

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update task' });
    }
  };

  const handleAnswerUpload = async () => {
    if (!answerFile || !selectedTask) return;

    const formData = new FormData();
    formData.append('answerPdf', answerFile);

    try {
      setUploading(true);

      // 1. Upload
      await api.post(
        `/student/task/${selectedTask._id}/upload-answer`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage({ type: 'success', text: 'Answer uploaded successfully' });
      setAnswerFile(null);

      // 2. Refresh Data
      const latestTasks = await fetchTasks();

      // 3. Update Modal
      const updatedTask = latestTasks.find((t: Task) => t._id === selectedTask._id);
      if (updatedTask) setSelectedTask(updatedTask);

    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-5 h-5" />;
      case 'Overdue': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const filters: FilterStatus[] = ['All', 'Pending', 'Completed', 'Overdue'];


  const renderAnswerSection = () => {
    if (!selectedTask) return null;

    // 1. If Task is COMPLETED -> Show "Completed" Status (NO Upload Box)
    if (selectedTask.status === 'Completed') {
      return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-gray-900 font-bold text-lg">Task Completed</h3>
          <p className="text-sm text-gray-500 mb-4">You have finished this assignment.</p>

          {selectedTask.answerPdf && (
            <a
              href={selectedTask.answerPdf} // ✅ FIXED: Removed localhost
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <FileText className="w-4 h-4" /> View My Submission
            </a>
          )}
        </div>
      );
    }

    if (selectedTask.status === 'Overdue') {
      return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
          <div className="flex justify-center mb-2">
            <TimerOff className="w-10 h-10 text-red-600 " />
          </div>
          <h3 className="text-gray-900 font-bold text-lg">Task Overdue</h3>
          <p className="text-sm text-gray-500 mb-4">You cannot submit this task now.</p>
        </div>
      );
    }

    // 2. If Task is PENDING + ANSWER UPLOADED -> Show "Finalize" Button
    if (selectedTask.answerPdf) {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Answer Uploaded</p>
                <p className="text-xs text-green-700">Ready to submit</p>
              </div>
            </div>
            <a
              href={selectedTask.answerPdf} // ✅ FIXED: Removed localhost
              target="_blank"
              rel="noreferrer"
              className="text-green-700 hover:underline text-sm font-medium"
            >
              View File
            </a>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate(selectedTask._id);
            }}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finalize & Mark as Completed
          </button>
        </div>
      );
    }

    // 3. If Task is PENDING + NO ANSWER -> Show Upload Box
    return (
      <div className="space-y-4">
        <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded-lg border border-amber-100 flex gap-2 items-start">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Please upload your answer PDF <strong>before</strong> marking this task as completed.</p>
        </div>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload answer</span>
            </p>
            <p className="text-xs text-gray-500">PDF files only</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAnswerFile(e.target.files[0]);
              }
            }}
          />
        </label>

        {answerFile && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-sm text-gray-600 truncate">{answerFile.name}</span>
            </div>
            <button onClick={() => setAnswerFile(null)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
          </div>
        )}

        <button
          disabled={!answerFile || uploading}
          onClick={handleAnswerUpload}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-200"
        >
          {uploading ? 'Uploading...' : 'Step 1: Upload Answer PDF'}
        </button>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-600 mb-8">Track and manage your assignments</p>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading tasks...</div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => { setSelectedTask(task); setAnswerFile(null); }}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
              >
                <div className="flex gap-4">
                  <div className={`p-3 h-fit rounded-xl ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>Due: {formatDate(task.deadline)}</span>
                        {task.answerPdf && (
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <FileText className="w-4 h-4" /> Answer Submitted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-10 text-gray-400">No tasks found</div>
            )}
          </div>
        )}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" /> Due {formatDate(selectedTask.deadline)}
                </div>
              </div>
              <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>


            <div className="p-6 overflow-y-auto">
              <div className="prose text-gray-600 mb-6 whitespace-pre-wrap">
                {selectedTask.description}
              </div>

              {selectedTask.questionPdf && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Folder className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Problem Statement</p>
                      <p className="text-xs text-blue-600">PDF Document</p>
                    </div>
                  </div>
                  <a
                    href={selectedTask.questionPdf} // ✅ FIXED: Removed localhost
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
                  >
                    <Eye className="w-4 h-4" /> View
                  </a>
                </div>
              )}

              <hr className="my-6 border-gray-100" />

              {/* === ANSWER SECTION (New Logic) === */}
              <h3 className="font-semibold text-gray-900 mb-4">Your Submission</h3>

              {renderAnswerSection()}

            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                Status: {selectedTask.status}
              </span>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}