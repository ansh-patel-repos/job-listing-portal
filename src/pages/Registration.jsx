import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8
                transition-all duration-300 hover:shadow-2xl"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Create Account
        </h1>
        <p className="text-sm text-center text-slate-500 mb-4">
          Create your account to get started
        </p>

        <form>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
              required
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
              required
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password..."
              required
              autoComplete="off"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-blue-500"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-500 hover:text-blue-600 text-sm">{showPassword ? <GoEye /> : <GoEyeClosed />}</button>
          </div>

          <hr className="my-6 border-slate-200" />
          {/* Role Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-2">
              Select Your Role
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Job Seeker */}
              <div
                onClick={() => handleRoleSelect("job_seeker")}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-200
                  ${
                    formData.role === "job_seeker" 
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400 scale-[1.02]"
                      : "border-slate-300 hover:border-blue-400 hover:shadow-md"
                  }`}
              >
                <h4 className="font-semibold text-slate-800">Job Seeker</h4>
                <p className="text-sm text-slate-500 mt-1">Looking for jobs</p>
              </div>

              {/* Employer */}
              <div
                onClick={() => handleRoleSelect("employer")}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-200
                  ${
                    formData.role === "employer"
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400 scale-[1.02]"
                      : "border-slate-300 hover:border-blue-400 hover:shadow-md"
                  }`}
              >
                <h4 className="font-semibold text-slate-800">Employer</h4>
                <p className="text-sm text-slate-500 mt-1">Hiring candidates</p>
              </div>
            </div>

            {!formData.role && (
              <p className="text-xs text-red-500 mt-2 italic">Please select a role</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg
           hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]
           transition-all duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};
