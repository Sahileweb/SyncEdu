import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
// import AdminSignup from './pages/Admin/AdminSignup';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StudentLogin from './pages/Student/StudentLogin';
import StudentDashboard from './pages/Student/StudentDashboard';
import AdminTasks from './pages/Admin/AdminTasks';
import StatsPage from './pages/Admin/StatsPage';
import Settings from './pages/Setting';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
<Routes>
  <Route path="/" element={<Landing />} />

  {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route 
    path="/admin/dashboard" 
    element={
      <ProtectedRoute allowedRole={['admin', 'superadmin']}>
        <AdminDashboard />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/superadmin/dashboard" 
    element={
      <ProtectedRoute allowedRole={['superadmin']}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    } 
  />
  <Route
    path="/admin/tasks"
    element={
      <ProtectedRoute allowedRole={['admin']}>
        <AdminTasks />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/settings"
    element={
      <ProtectedRoute allowedRole={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/admin/stats" element={
    <ProtectedRoute allowedRole={['admin']}>
      <StatsPage/>
    </ProtectedRoute>
  }/>
  <Route
    path="/admin/account"
    element={
      <ProtectedRoute allowedRole={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/student/login" element={<StudentLogin />} />
  <Route
    path="/student/dashboard"
    element={
      <ProtectedRoute allowedRole={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/student/account"
    element={
      <ProtectedRoute allowedRole={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/settings" element={<Settings/>} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
