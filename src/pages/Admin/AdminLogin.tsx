import { useState } from 'react';
import { LogIn } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await api.post('/admin/login', formData);
    const decoded: any = jwtDecode(response.data.token);
    localStorage.setItem("adminToken", response.data.token);
    localStorage.setItem("role", decoded.role); // save role
    if(decoded.role === "superadmin"){
       navigate("/superadmin/dashboard");
    } else {
       navigate("/admin/dashboard");
    }
  } catch (err: any) {
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-xl">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600 text-center mb-8">Welcome back</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-blue-50 border border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-blue-50 border border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/admin/signup" className="text-blue-600 font-medium hover:text-blue-700">
              Sign up
            </Link>
            
          </p> */}
        </div>
        
      </div>
      
    </div>
  );
}
