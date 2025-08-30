import API from "./axios";
import type { Link } from "../types/models";

export async function getLinks() {
  const res = await API.get<Link[]>("/links/");
  return res.data;
}

export async function createLink(data: Partial<Link>) {
  const res = await API.post<Link>("/links/", data);
  return res.data;
}

export async function deleteLink(id: number) {
  await API.delete(`/links/${id}/`);
}

export async function updateLink(id: number, data: Partial<Link>): Promise<Link> {
  const res = await API.put<Link>(`/links/${id}/`, data);
  return res.data;
}