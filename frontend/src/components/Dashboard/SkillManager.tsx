import { useEffect, useState } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../../api/skills";
import type { Skill } from "../../types/models";

export default function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("Beginner"); // default value
  const levelOptions = ["Beginner", "Intermediate", "Expert"];

  useEffect(() => {
    getSkills().then(setSkills).catch(console.error);
  }, []);

  // Add new skill
  async function addSkill() {
    if (!newSkill) return;
    try {
      const skill = await createSkill({
        name: newSkill,
        level: newLevel,
        profile: 4,
      });
      setSkills((prev) => [...prev, skill]);
      setNewSkill("");
      setNewLevel("Beginner");
    } catch (err) {
      console.error("Failed to add skill:", err);
    }
  }

  // Delete skill
  async function removeSkill(id: number) {
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete skill:", err);
    }
  }

  // Edit skill inline
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editLevel, setEditLevel] = useState("Beginner");

  function startEdit(skill: Skill) {
    setEditingId(skill.id);
    setEditName(skill.name);
    setEditLevel(skill.level || "Beginner");
  }

  async function saveEdit(id: number) {
    try {
      const updated = await updateSkill(id, {
        name: editName,
        level: editLevel,
        profile: 4,
      });
      setSkills((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update skill:", err);
    }
  }

  return (
    <div className="w-fit mx-auto bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Skills</h2>
      <ul className="mb-4">
        {skills.map((s) => (
          <li key={s.id} className="mb-2 flex flex-col md:flex-row md:items-center justify-between border-b pb-2">
            {editingId === s.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <input className="border rounded px-2 py-1" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <select className="border rounded px-2 py-1" value={editLevel} onChange={(e) => setEditLevel(e.target.value)}>
                  {levelOptions.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => saveEdit(s.id)}>Save</button>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <span className="font-medium">{s.name} ({s.level})</span>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => startEdit(s)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => removeSkill(s.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <input
          className="border rounded px-2 py-1"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="New Skill"
        />
        <select className="border rounded px-2 py-1" value={newLevel} onChange={(e) => setNewLevel(e.target.value)}>
          {levelOptions.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={addSkill}>Add</button>
      </div>
    </div>
  );
}
