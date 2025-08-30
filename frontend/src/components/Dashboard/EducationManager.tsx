import { useEffect, useState } from "react";
import { getEducation, createEducation, updateEducation, deleteEducation } from "../../api/education";
import type { Education } from "../../types/models";

export default function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDegree, setEditDegree] = useState("");
  const [editInstitution, setEditInstitution] = useState("");
  const [editStartYear, setEditStartYear] = useState("");
  const [editEndYear, setEditEndYear] = useState("");

  useEffect(() => {
    getEducation().then(setEducation).catch(console.error);
  }, []);

  const addEducation = async () => {
    if (!degree || !institution || !startYear) return;
    try {
      const edu = await createEducation({
        degree,
        institution,
        start_year: parseInt(startYear),
        end_year: endYear ? parseInt(endYear) : undefined,
        profile: 4,
      });
      setEducation([...education, edu]);
      setDegree(""); setInstitution(""); setStartYear(""); setEndYear("");
    } catch (err) { console.error(err); }
  };

  const removeEducation = async (id: number) => {
    try {
      await deleteEducation(id);
      setEducation(education.filter(e => e.id !== id));
    } catch (err) { console.error(err); }
  };

  const startEdit = (edu: Education) => {
    setEditingId(edu.id);
    setEditDegree(edu.degree);
    setEditInstitution(edu.institution);
    setEditStartYear(edu.start_year.toString());
    setEditEndYear(edu.end_year?.toString() || "");
  };

  const saveEdit = async (id: number) => {
    try {
      const updated = await updateEducation(id, {
        degree: editDegree,
        institution: editInstitution,
        start_year: parseInt(editStartYear),
        end_year: editEndYear ? parseInt(editEndYear) : undefined,
        profile: 4,
      });
      setEducation(education.map(e => e.id === id ? updated : e));
      setEditingId(null);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="w-fit mx-auto bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Education</h2>
      <ul className="mb-4">
        {education.map(e => (
          <li key={e.id} className="mb-2 flex flex-col md:flex-row md:items-center justify-between border-b pb-2">
            {editingId === e.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <input className="border rounded px-2 py-1" value={editDegree} onChange={ev => setEditDegree(ev.target.value)} placeholder="Degree" />
                <input className="border rounded px-2 py-1" value={editInstitution} onChange={ev => setEditInstitution(ev.target.value)} placeholder="Institution" />
                <input className="border rounded px-2 py-1" value={editStartYear} onChange={ev => setEditStartYear(ev.target.value)} placeholder="Start Year" />
                <input className="border rounded px-2 py-1" value={editEndYear} onChange={ev => setEditEndYear(ev.target.value)} placeholder="End Year" />
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => saveEdit(e.id)}>Save</button>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <span className="font-medium">{e.degree} at {e.institution} ({e.start_year}-{e.end_year || "Present"})</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => startEdit(e)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeEducation(e.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col md:flex-row gap-2">
        <input className="border rounded px-2 py-1" placeholder="Degree" value={degree} onChange={e => setDegree(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Institution" value={institution} onChange={e => setInstitution(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Start Year" value={startYear} onChange={e => setStartYear(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="End Year" value={endYear} onChange={e => setEndYear(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={addEducation}>Add</button>
      </div>
    </div>
  );
}
