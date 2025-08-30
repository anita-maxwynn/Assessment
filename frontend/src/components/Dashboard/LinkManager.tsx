import { useEffect, useState } from "react";
import { getLinks, createLink, updateLink, deleteLink } from "../../api/link";
import type { Link } from "../../types/models";

export default function LinkManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [type, setType] = useState("GitHub");
  const [url, setUrl] = useState("");

  // Add Resume here
  const linkOptions = ["GitHub", "LinkedIn", "Portfolio", "Twitter", "Resume", "Other"];

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editType, setEditType] = useState("GitHub");
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    getLinks().then(setLinks).catch(console.error);
  }, []);

  const addLink = async () => {
    if (!url) return;
    try {
      const l = await createLink({ type, url, profile: 4 });
      setLinks([...links, l]);
      setType("GitHub");
      setUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const removeLink = async (id: number) => {
    try {
      await deleteLink(id);
      setLinks(links.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (l: Link) => {
    setEditingId(l.id);
    setEditType(l.type);
    setEditUrl(l.url);
  };

  const saveEdit = async (id: number) => {
    try {
      const updated = await updateLink(id, { type: editType, url: editUrl, profile: 4 });
      setLinks(links.map(l => l.id === id ? updated : l));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Links</h2>
      <ul className="mb-4">
        {links.map(l => (
          <li key={l.id} className="mb-2 flex flex-col md:flex-row md:items-center justify-between border-b pb-2">
            {editingId === l.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <select className="border rounded px-2 py-1" value={editType} onChange={e => setEditType(e.target.value)}>
                  {linkOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <input className="border rounded px-2 py-1 flex-1" value={editUrl} onChange={e => setEditUrl(e.target.value)} />
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => saveEdit(l.id)}>Save</button>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <span className="font-medium">{l.type}: {l.type === "Resume" ? (
                  <a className="text-blue-600 underline" href={l.url} target="_blank" rel="noopener noreferrer">View Resume</a>
                ) : (
                  <a className="text-blue-600 underline" href={l.url} target="_blank" rel="noopener noreferrer">{l.url}</a>
                )}</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => startEdit(l)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeLink(l.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-col md:flex-row gap-2">
        <select className="border rounded px-2 py-1" value={type} onChange={e => setType(e.target.value)}>
          {linkOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <input className="border rounded px-2 py-1 flex-1" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={addLink}>Add</button>
      </div>
    </div>
  );
}
