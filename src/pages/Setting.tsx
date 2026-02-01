import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import api from "../lib/api";
import DashboardLayout from "../components/Layout/DashboardLayout";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedToken =
      savedRole === "admin"
        ? localStorage.getItem("adminToken")
        : localStorage.getItem("studentToken");
    if (!savedRole || !savedToken) {
      window.location.href = "/login";
      return;
    }
    setRole(savedRole);
    setToken(savedToken);
  }, []);

  const handleChangePassword = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!oldPassword || !newPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        role === "admin"
          ? "/admin/change-password"
          : "/students/change-password";

      const response = await api.put(endpoint, {
        oldPassword,
        newPassword,
      });

      setSuccessMessage(response.data.message || "Password updated successfully!");

      const newToken = response.data.token;
      if (newToken) {
        if (role === "admin") localStorage.setItem("adminToken", newToken);
        else localStorage.setItem("studentToken", newToken);
        setToken(newToken);
      }

      setOldPassword("");
      setNewPassword("");

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via--50 to-slate-50 flex justify-center items-start">
        <div className="w-full max-w-md mt-10 space-y-6">

          {/* Change Password Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Lock className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Change Password</h1>
                <p className="text-sm text-slate-600 mt-1">Update your account security</p>
              </div>
            </div>

            {/* Success */}
            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800">{successMessage}</p>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}

            {/* Old Password */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Current Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full p-3 pr-12 border border-slate-300 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full p-3 pr-12 border border-slate-300 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
            </div>

            {/* Update Button */}
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </div>

    
          

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
