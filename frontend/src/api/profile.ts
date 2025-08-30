import API from "./axios";
import type { Profile } from "../types/models";

export async function getProfile() {
  const res = await API.get<Profile[]>("/profiles/");
  return res.data[0]; // only one profile
}

export async function updateProfile(id: number, data: FormData) {
  const res = await API.put<Profile>(`/profiles/${id}/`, data);
  return res.data;
}
