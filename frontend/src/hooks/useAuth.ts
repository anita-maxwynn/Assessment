import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("access"));

  useEffect(() => {
    function handleStorageChange() {
      setIsAuth(!!localStorage.getItem("access"));
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return isAuth;
}
