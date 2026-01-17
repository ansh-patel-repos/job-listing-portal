import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // Navigate to dashboard only on successful login
    useEffect(() => {
        if (isAuthenticated && !isLoading && Object.keys(errors).length === 0) {
            console.log("✅ User authenticated! Redirecting to dashboard...")
            navigate("/dashboard")
        }
    }, [isAuthenticated, isLoading, errors, navigate])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate required fields
        if (!formData.email.trim()) {
            setErrors({ email: "Email is required" })
            return
        }
        if (!formData.password) {
            setErrors({ password: "Password is required" })
            return
        }

        // Clear field-level errors but keep general errors
        setErrors((prev) => ({
            general: prev.general, // Keep the general error message
        }))

        setIsLoading(true)

        try {
            console.log("🔄 Logging in with:", formData.email)
            const response = await login(formData.email, formData.password)
            console.log("✅ Login successful:", response)
            console.log("📍 User data:", response.user)
            // Navigate to dashboard after successful login
            setTimeout(() => {
                navigate("/dashboard", { replace: true })
            }, 100)
        } catch (error) {
            console.error("❌ Login error:", error)
            console.error("Error response:", error.response?.data)
            setIsLoading(false)
            
            const errorMessage = error.response?.data?.message || "Login failed"
            
            // If user doesn't exist, redirect to register page
            if (errorMessage.includes("Invalid email or password")) {
                console.log("📍 User not found, redirecting to register page...")
                // Use replace to prevent back button returning to login
                navigate("/", { replace: true })
                return
            }
            
            // For other errors, show the error message
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ general: errorMessage })
            }
        }
    }

    const handleGoogleLogin = () => {
        // Redirect to backend Google OAuth endpoint
        window.location.href = "http://localhost:5000/api/auth/google";
    }

    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8
                transition-all duration-300 hover:shadow-2xl">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Login to your account
        </h1>

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

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-9 text-slate-500 hover:text-blue-600 text-sm">
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg
             hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]
             transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {errors.general && (
            <p className="text-sm text-red-500 mt-4 text-center">{errors.general}</p>
          )}
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Don't have an account?
          <NavLink
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
}