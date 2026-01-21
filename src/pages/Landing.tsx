// import { Link } from 'react-router-dom';
// import { GraduationCap, Users } from 'lucide-react';

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 flex items-center justify-center p-4">
//       <div className="max-w-4xl w-full">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">
//           SyncEdu
//           </h1>
//           <p className="text-xl text-gray-600">
//             Simplifying student tasks and boosting academic productivity
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <Link
//             to="/admin/login"
//             className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-200"
//           >
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-blue-100 p-4 rounded-xl mb-4 group-hover:bg-blue-200 transition-colors">
//                 <Users className="w-12 h-12 text-blue-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
//               <p className="text-gray-600 mb-4">
//                 Manage students, assign tasks, and monitor progress
//               </p>
//               <span className="text-blue-600 font-medium group-hover:underline">
//                 Login as Admin →
//               </span>
//             </div>
//           </Link>

//           <Link
//             to="/student/login"
//             className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-200"
//           >
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-green-100 p-4 rounded-xl mb-4 group-hover:bg-green-200 transition-colors">
//                 <GraduationCap className="w-12 h-12 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h2>
//               <p className="text-gray-600 mb-4">
//                 See assignments, update status, and own your learning journey
//               </p>
//               <span className="text-green-600 font-medium group-hover:underline">
//                 Login as Student →
//               </span>
//             </div>
//           </Link>
//         </div>

//         <div className="mt-12 text-center">
//           <p className="text-gray-600">
//             New admin?{' '}
//             <Link to="/admin/signup" className="text-blue-600 font-medium hover:underline">
//               Create an account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { GraduationCap, Users, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 px-6 py-6">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
//               <GraduationCap className="w-9 h-9 text-white" />
//             </div>
//             <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               SyncEdu
//             </span>
//           </div>
         

//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="relative z-10 px-6 pt-16 pb-24">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto mb-20">
//             <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
//               <Sparkles className="w-4 h-4" />
//               Transforming Education Management
//             </div>
//             <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//               Simplifying student tasks,{' '}
//               <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//                 boosting productivity
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//               Built to align educators and students, effortlessly.
//             </p>
//           </div>

//           {/* Cards Grid */}
//           <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//             {/* Admin Portal Card */}
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
//               <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
                
//                 <div className="relative p-8">
//                   <div className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
//                     <Users className="w-8 h-8 text-white" />
//                   </div>
                  
//                   <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                     Admin Portal
//                   </h2>
                  
//                   <p className="text-gray-800 mb-6 leading-relaxed">
//                     Manage students, assign tasks, and monitor progress with powerful administrative tools
//                   </p>
                  
//                   <div className="space-y-3 mb-8">
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
//                       <span>Student management dashboard</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
//                       <span>Task assignment and tracking</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
//                       <span>Real-time progress monitoring</span>
//                     </div>
//                   </div>
                  
//                   <a 
//                     href="/admin/login" 
//                     className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
//                   >
//                     Login as Admin
//                     <ArrowRight className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Student Portal Card */}
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
//               <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
                
//                 <div className="relative p-8">
//                   <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg mb-6">
//                     <BookOpen className="w-8 h-8 text-white" />
//                   </div>
                  
//                   <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                     Student Portal
//                   </h2>
                  
//                   <p className="text-gray-800 mb-6 leading-relaxed">
//                     See assignments, update status, and own your learning journey with intuitive tools
//                   </p>
                  
//                   <div className="space-y-3 mb-8">
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
//                       <span>View all assignments</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
//                       <span>Update task status instantly</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-gray-800">
//                       <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
//                       <span>Track your progress</span>
//                     </div>
//                   </div>
                  
//                   <a 
//                     href="/student/login" 
//                     className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
//                   >
//                     Login as Student
//                     <ArrowRight className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom CTA */}
//           <div className="text-center mt-16">
//             <p className="text-gray-600 text-lg">
//               New admin?{' '}
//               <a 
//                 href="/admin/signup" 
//                 className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-4"
//               >
//                 Create an account
//               </a>
//             </p>
//           </div>
//         </div>
//       </main>

//       <style>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Users, ArrowRight, Sparkles, BookOpen } from 'lucide-react';


export default function Landing() {
 const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);


 useEffect(() => {
  observerRef.current = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
  );

  const elements = document.querySelectorAll('[data-animate]');
  elements.forEach((el) => {
    if (observerRef.current) {
      observerRef.current.observe(el);
    }
  });

  return () => {
    observerRef.current?.disconnect();
  };
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2.5 rounded-xl shadow-md">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             SyncEdu
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
              <Sparkles className="w-4 h-4" />
              Transforming Education Management
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Simplifying student tasks,{' '}
              <span className="text-blue-700">
                boosting productivity
              </span>
            </h1>
            {/* <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Built to align educators and students, effortlessly.
            </p> */}
          </div>

          {/* Cards Grid */}
          <div 
            id="cards-section"
            data-animate
            className={`grid md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-500 ${
              isVisible['cards-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Admin Portal Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-blue-200 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 ease-in-out"></div>
              <div className="relative bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200">
                
                <div className="relative p-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-md mb-6 transition-transform duration-300 ease-in-out group-hover:scale-105">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">
                    Admin Portal
                  </h2>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Manage students, assign tasks, and monitor progress with powerful administrative tools
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Student management dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Task assignment and tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Real-time progress monitoring</span>
                    </div>
                  </div>
                  
                  <a 
                    href="/admin/login" 
                    className="inline-flex items-center justify-center w-full gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Login as Admin
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Student Portal Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 ease-in-out"></div>
              <div className="relative bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
                
                <div className="relative p-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl shadow-md mb-6 transition-transform duration-300 ease-in-out group-hover:scale-105">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">
                    Student Portal
                  </h2>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    See assignments, update status, and own your learning journey with intuitive tools
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>View all assignments</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Update task status instantly</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 transition-transform duration-300 hover:translate-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Track your progress</span>
                    </div>
                  </div>
                  
                  <a 
                    href="/student/login" 
                    className="inline-flex items-center justify-center w-full gap-2 bg-purple-500 text-white px-6 py-4 rounded-xl font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-purple-600 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Login as Student
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
  id="cta-section"
  data-animate
  className={`text-center mt-16 transition-transform duration-500 delay-200 ${
    isVisible['cta-section'] ? 'translate-y-0' : 'translate-y-8'
  } opacity-100`}
>
  {/* <p className="text-slate-600 text-lg">
    New admin?{' '}
    <a
      href="/admin/signup"
      className="relative font-semibold text-blue-700 hover:text-blue-800
                 after:absolute after:left-0 after:-bottom-1
                 after:h-0.5 after:w-0 after:bg-blue-700
                 after:transition-all after:duration-300
                 hover:after:w-full"
    >
      Create an account
    </a>
  </p> */}
</div>

        </div>
      </main>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 9s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out 0.1s forwards;
          opacity: 0;
        }
        
        /* Navigation link underline animation */
        .nav-link:hover .nav-underline {
          width: 100%;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Focus states for accessibility */
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}