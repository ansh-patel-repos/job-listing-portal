import { createBrowserRouter, RouterProvider } from "react-router-dom" 
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { ErrorPage } from "./pages/ErrorPage"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SeekerDashboard } from "./pages/SeekerDashboard";
import { EmployerDashboard } from "./pages/EmployerDashboard";
import { EmployerProfile } from "./pages/EmployerProfile";
import { SeekerProfile } from "./pages/SeekerProfile";
import { PublicRoute } from "./components/PublicRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute><Registration/></PublicRoute>,
    errorElement: <ErrorPage />
  },
  
  {
    path: "/login",
    element: <PublicRoute><Login/></PublicRoute>,
    errorElement: <ErrorPage/>
  },

  {
    path: "/seeker/dashboard",
    element: (
      <ProtectedRoute allowedRole="job_seeker">
        <SeekerDashboard/>
      </ProtectedRoute>
    ),
  },
  
  {
    path: "/employer/dashboard",
    element: (
      <ProtectedRoute allowedRole="employer">
        <EmployerDashboard/>
      </ProtectedRoute>
    ),
  },

  {
    path: "/employer/profile",
    element: (
      <ProtectedRoute allowedRole="employer">
        <EmployerProfile/>
      </ProtectedRoute>
    ),
  },

  {
    path: "/seeker/profile",
    element: (
      <ProtectedRoute allowedRole="job_seeker">
        <SeekerProfile/>
      </ProtectedRoute>
    ),
  },
])

const App = () => {
  return <RouterProvider router={Router}></RouterProvider>
}

export default App;