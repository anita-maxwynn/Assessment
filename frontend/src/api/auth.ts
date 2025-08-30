import API from "./axios";

export async function login(username: string, password: string) {
  const res = await API.post("/token/", { username, password });
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  // console.log(res.data);
  return res.data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  const res = await API.post("/token/refresh/", { refresh });
  localStorage.setItem("access", res.data.access);
  return res.data.access;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}
