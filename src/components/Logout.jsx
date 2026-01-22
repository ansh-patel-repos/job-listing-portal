import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return <button onClick={logout}>Logout</button>;
};
