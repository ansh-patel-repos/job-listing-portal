import { NavLink } from "react-router-dom";
import { LogoutButton } from "../components/Logout";

export const SeekerDashboard = () => {
   return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
        <LogoutButton/>
      </div>

      <NavLink
        to="/seeker/profile"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Profile
      </NavLink>
    </div>
  );
}