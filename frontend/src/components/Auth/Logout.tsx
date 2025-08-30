import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
