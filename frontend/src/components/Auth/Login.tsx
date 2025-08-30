import { useState, useEffect } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../Public/Navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Prevent body scroll while on this page
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll
    return () => {
      document.body.style.overflow = ""; // restore scroll when leaving
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(username, password);
      if (localStorage.getItem("access")) {
        window.dispatchEvent(new Event("authchange"));
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">  
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-extrabold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Sign in to access your dashboard
          </p>

          <div className="space-y-4">
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition"
          >
            Login
          </button>

          {/* <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign up
            </span>
          </p> */}
        </form>
      </div>
    </>
  );
}
