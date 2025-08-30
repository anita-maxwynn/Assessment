import API from "./axios";
import type { Education } from "../types/models";

export async function getEducation() {
  const res = await API.get<Education[]>("/education/");
  return res.data;
}

export async function createEducation(data: Partial<Education>) {
  const res = await API.post<Education>("/education/", data);
  return res.data;
}

export async function deleteEducation(id: number) {
  await API.delete(`/education/${id}/`);
}
export async function updateEducation(id: number, data: Partial<Education>) {
  const res = await API.patch<Education>(`/education/${id}/`, data);
  return res.data;
}