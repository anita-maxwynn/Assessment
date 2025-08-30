import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactElement } from "react";

export default function PublicRoute({ children }: { children: ReactElement }) {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/dashboard" replace /> : children;
}
