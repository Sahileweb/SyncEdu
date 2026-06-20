import { useState } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import api from '../../lib/api';

export default function SuperAdminDashboard() {
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/superadmin/create-admin', adminForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      setMessage({ type: 'success', text: 'Admin created successfully!' });
      setAdminForm({ name: '', email: '', password: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create admin' });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Super Admin Dashboard</h1>

        {message.text && (
          <div className={`p-4 mb-6 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleCreateAdmin} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <label className="block mb-1.5 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              required
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              required
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            Create Admin
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
