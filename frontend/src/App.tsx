import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import LogOut from "./components/Auth/Logout";
import useAuth from "./hooks/useAuth";
import PublicRoute from "./routes/PublicRoute.tsx";
import type { ReactElement } from "react";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const isAuth = useAuth(); // make sure useAuth returns boolean
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogOut />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
