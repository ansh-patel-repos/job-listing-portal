import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom" 
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { ErrorPage } from "./pages/ErrorPage"
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { AuthSuccess } from "./pages/AuthSuccess";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirect if already authenticated - only for login page)
const PublicRoute = ({ children, redirectIfAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (redirectIfAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute redirectIfAuth={false}>
        <Registration />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />
  },
  
  {
    path: "/login",
    element: (
      <PublicRoute redirectIfAuth={false}>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorPage/>
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage/>
  },

  {
    path: "/auth-success",
    element: <AuthSuccess />,
    errorElement: <ErrorPage/>
  },
])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  )
}

export default App;