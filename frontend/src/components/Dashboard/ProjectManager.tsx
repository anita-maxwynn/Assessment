import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../../api/project";
import type { Project } from "../../types/models";

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [techStack, setTechStack] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editTechStack, setEditTechStack] = useState("");

  useEffect(() => { getProjects().then(setProjects).catch(console.error); }, []);

  const addProject = async () => {
    if (!title || !description) return;
    try {
      const p = await createProject({
        title,
        description,
        link,
        tech_stack: techStack.split(",").map(s => s.trim()),
        profile: 4,
      });
      setProjects([...projects, p]);
      setTitle(""); setDescription(""); setLink(""); setTechStack("");
    } catch (err) { console.error(err); }
  };

  const removeProject = async (id: number) => {
    try { await deleteProject(id); setProjects(projects.filter(p => p.id !== id)); } 
    catch (err) { console.error(err); }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditDescription(p.description);
    setEditLink(p.link || "");
    setEditTechStack(p.tech_stack?.join(", ") || "");
  };

  const saveEdit = async (id: number) => {
    try {
      const updated = await updateProject(id, {
        title: editTitle,
        description: editDescription,
        link: editLink,
        tech_stack: editTechStack.split(",").map(s => s.trim()),
        profile: 4,
      });
      setProjects(projects.map(p => p.id === id ? updated : p));
      setEditingId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="w-fit mx-auto bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
      <ul className="mb-4">
        {projects.map(p => (
          <li key={p.id} className="mb-2 flex flex-col md:flex-row md:items-center justify-between border-b pb-2">
            {editingId === p.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <input className="border rounded px-2 py-1" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title" />
                <input className="border rounded px-2 py-1" value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="Description" />
                <input className="border rounded px-2 py-1" value={editLink} onChange={e => setEditLink(e.target.value)} placeholder="Link" />
                <input className="border rounded px-2 py-1" value={editTechStack} onChange={e => setEditTechStack(e.target.value)} placeholder="Tech Stack (comma separated)" />
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => saveEdit(p.id)}>Save</button>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <span className="font-medium">{p.title} ({p.tech_stack?.join(", ")})</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => startEdit(p)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeProject(p.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col md:flex-row gap-2">
        <input className="border rounded px-2 py-1" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Link" value={link} onChange={e => setLink(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Tech Stack (comma separated)" value={techStack} onChange={e => setTechStack(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={addProject}>Add</button>
      </div>
    </div>
  );
}
