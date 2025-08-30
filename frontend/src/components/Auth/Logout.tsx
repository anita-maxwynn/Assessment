import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();             // clears tokens from localStorage
    navigate("/login");   // redirect to login page
  };

  return (
    <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 transition"
      >
        Logout
      </button>
  );
}
