import { useEffect, useState } from "react";
import { getWork, createWork, updateWork, deleteWork } from "../../api/work";
import type { Work } from "../../types/models";

export default function WorkManager() {
  const [work, setWork] = useState<Work[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => { getWork().then(setWork).catch(console.error); }, []);

  const addWork = async () => {
    if (!company || !role || !startDate) return;
    try {
      const w = await createWork({
        company,
        role,
        start_date: startDate,
        end_date: endDate || undefined,
        description,
        profile: 4,
      });
      setWork([...work, w]);
      setCompany(""); setRole(""); setStartDate(""); setEndDate(""); setDescription("");
    } catch (err) { console.error(err); }
  };

  const removeWork = async (id: number) => {
    try { await deleteWork(id); setWork(work.filter(w => w.id !== id)); } 
    catch (err) { console.error(err); }
  };

  const startEdit = (w: Work) => {
    setEditingId(w.id);
    setEditCompany(w.company);
    setEditRole(w.role);
    setEditStart(w.start_date);
    setEditEnd(w.end_date || "");
    setEditDesc(w.description || "");
  };

  const saveEdit = async (id: number) => {
    try {
      const updated = await updateWork(id, {
        company: editCompany,
        role: editRole,
        start_date: editStart,
        end_date: editEnd || undefined,
        description: editDesc,
        profile: 4,
      });
      setWork(work.map(w => w.id === id ? updated : w));
      setEditingId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-w-fit mx-auto bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Work</h2>
      <ul className="mb-4">
        {work.map(w => (
          <li key={w.id} className="mb-2 flex flex-col md:flex-row md:items-center justify-between border-b pb-2">
            {editingId === w.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <input className="border rounded px-2 py-1" value={editCompany} onChange={e => setEditCompany(e.target.value)} placeholder="Company" />
                <input className="border rounded px-2 py-1" value={editRole} onChange={e => setEditRole(e.target.value)} placeholder="Role" />
                <input className="border rounded px-2 py-1" type="date" value={editStart} onChange={e => setEditStart(e.target.value)} />
                <input className="border rounded px-2 py-1" type="date" value={editEnd} onChange={e => setEditEnd(e.target.value)} />
                <input className="border rounded px-2 py-1" value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description" />
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => saveEdit(w.id)}>Save</button>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <span className="font-medium">{w.role} at {w.company} ({w.start_date} - {w.end_date || "Present"})</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => startEdit(w)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeWork(w.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col md:flex-row gap-2">
        <input className="border rounded px-2 py-1" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
        <input className="border rounded px-2 py-1" type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input className="border rounded px-2 py-1" type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={addWork}>Add</button>
      </div>
    </div>
  );
}
