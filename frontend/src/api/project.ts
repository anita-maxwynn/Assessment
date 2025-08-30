import API from "./axios";
import type { Project } from "../types/models";

export async function getProjects() {
  const res = await API.get<Project[]>("/projects/");
  return res.data;
}

export async function createProject(data: Partial<Project>) {
  const res = await API.post<Project>("/projects/", data);
  return res.data;
}

export async function deleteProject(id: number) {
  await API.delete(`/projects/${id}/`);
}


export async function updateProject(id: number, data: Partial<Project>) {
  const res = await API.put<Project>(`/projects/${id}/`, data);
  return res.data;
}
