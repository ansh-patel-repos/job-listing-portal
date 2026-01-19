import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}!</h1>
              <p className="text-slate-600 mt-2">
                Role: <span className="font-semibold capitalize">{user?.role?.replace('_', ' ')}</span>
              </p>
            </div>
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            )}
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Email</p>
              <p className="text-lg font-semibold text-slate-800">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Account Type</p>
              <p className="text-lg font-semibold text-blue-600 capitalize">
                {user?.role === 'job_seeker' ? 'Job Seeker' : 'Employer'}
              </p>
            </div>
            {user?.profile?.company && (
              <div>
                <p className="text-sm text-slate-600">Company</p>
                <p className="text-lg font-semibold text-slate-800">{user.profile.company}</p>
              </div>
            )}
            {user?.profile?.location && (
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="text-lg font-semibold text-slate-800">{user.profile.location}</p>
              </div>
            )}
          </div>
        </div>

        {/* Role-Specific Content */}
        {user?.role === 'job_seeker' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">🎯 Job Seeker Features</h2>
            <p className="text-slate-600">
              Coming soon: Browse and apply for jobs, manage applications, and build your professional profile.
            </p>
          </div>
        )}

        {user?.role === 'employer' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">📋 Employer Features</h2>
            <p className="text-slate-600">
              Coming soon: Post job listings, manage applications, and find talented candidates.
            </p>
          </div>
        )}

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg
                     hover:bg-red-700 hover:shadow-lg active:scale-[0.98]
                     transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
