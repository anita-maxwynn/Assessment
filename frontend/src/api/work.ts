import API from "./axios";
import type { Work } from "../types/models";

export async function getWork() {
  const res = await API.get<Work[]>("/work/");
  return res.data;
}

export async function createWork(data: Partial<Work>) {
  const res = await API.post<Work>("/work/", data);
  return res.data;
}

export async function deleteWork(id: number) {
  await API.delete(`/work/${id}/`);
}
export async function updateWork(id: number, data: Partial<Work>) {
  const res = await API.put<Work>(`/work/${id}/`, data);
  return res.data;
}
