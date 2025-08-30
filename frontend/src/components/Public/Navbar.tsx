import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logout from "../Auth/Logout";

export default function Navbar() {
  const isAuth = useAuth();
  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-700">Assesment</span>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Profile</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">Dashboard</Link>
          {isAuth ? (
            <>
              <Logout />
            </>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
