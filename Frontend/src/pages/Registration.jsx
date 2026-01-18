import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate role is selected
    if (!formData.role) {
      setErrors({ role: "Please select a role" });
      return;
    }

    // Validate all required fields
    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }
    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log("Registering user...", formData);
      await register(formData);
      console.log("Registration successful, navigating to dashboard");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        const message = error.response?.data?.message || "Registration failed";
        // Handle duplicate email error
        if (message.includes("Email already registered")) {
          setErrors({ email: "This email is already registered. Please login or use a different email." });
        } else {
          setErrors({ general: message });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = "http://localhost:5000/api/auth/google";
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

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-slate-300 text-slate-700 font-semibold py-2.5 rounded-lg
                     hover:bg-slate-50 hover:shadow-md active:scale-[0.98]
                     transition-all duration-200 flex items-center justify-center gap-2 mb-4"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
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
            {errors.role && (
              <p className="text-xs text-red-500 mt-2 italic">{errors.role}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg
           hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]
           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {errors.general && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">{errors.general}</p>
            </div>
          )}
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
