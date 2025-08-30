import API from "./axios";
import type { Skill } from "../types/models";

export async function getSkills() {
  const res = await API.get<Skill[]>("/skills/");
  return res.data;
}

export async function createSkill(data: Partial<Skill>) {
  const res = await API.post<Skill>("/skills/", data);
  return res.data;
}

export async function deleteSkill(id: number) {
  await API.delete(`/skills/${id}/`);
}
export async function updateSkill(id: number, data: Partial<Skill>) {
  const res = await API.put<Skill>(`/skills/${id}/`, data);
  return res.data;
}