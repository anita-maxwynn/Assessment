import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";
import axios from "../../api/axios";
import type { Profile } from "../../types/models";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Linkedin, Github, Twitter, Globe, FileText, SquareAsterisk, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProfileView() {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [topSkills, setTopSkills] = useState<{ name: string; count: number }[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // new state for collapsible

  useEffect(() => {
    getProfile().then(setProfile);
    axios.get("/skills/top/").then(res => setTopSkills(res.data));
  }, []);

  const handleSkillFilter = (skill: string) => {
    axios.get(`/projects/filter_by_skill/?skill=${encodeURIComponent(skill)}`)
      .then(res => setFilteredProjects(res.data));
    setSearchOpen(true); // auto-open collapsible when filtering
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    axios.get(`/profiles/search/?q=${encodeURIComponent(searchQuery)}`)
      .then(res => setSearchResults(res.data));
    setSearchOpen(true); // open search panel
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "github": return Github;
      case "linkedin": return Linkedin;
      case "twitter": return Twitter;
      case "portfolio": return Globe;
      case "resume": return FileText;
      default: return SquareAsterisk;
    }
  };

  const getUsername = (url: string) => {
    try {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1] || url;
    } catch { return url; }
  };

  if (!profile) return <p className="text-center py-12 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-10">

        {/* Collapsible Search */}
        <div className="mb-6">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center justify-between w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {searchOpen ? "Hide Search & Filters" : "Show Search & Filters"}
            {searchOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {searchOpen && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-inner">
              {/* Search Input */}
              <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search profile, skills, projects..."
                  className="border px-3 py-2 rounded-lg shadow-sm flex-1"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >Search</button>
                <button
                  onClick={() => { setSearchResults([]); setSearchQuery(""); setFilteredProjects([]); }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                >Clear</button>
              </div>

              {/* Top Skills */}
              <div className="mb-4">
                <span className="font-semibold text-blue-700 mr-2">Top Skills:</span>
                {topSkills.map(s => (
                  <button
                    key={s.name}
                    onClick={() => handleSkillFilter(s.name)}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mr-2 hover:bg-blue-200"
                  >{s.name} ({s.count})</button>
                ))}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-blue-700">Search Results</h2>
                  {searchResults.map((r, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-4 shadow mb-2">
                      <h3 className="font-bold text-blue-800 capitalize">{r.type}</h3>
                      <ul className="list-disc list-inside">
                        {r.value.map ? (
                          r.value.map((item: any, i: number) => (
                            <li key={i}>
                              {r.type === "projects" && (
                                <>
                                  <span className="font-semibold">{item.title}</span> - {item.tech_stack?.join(", ")}
                                </>
                              )}
                              {r.type === "skills" && <>{item}</>}
                              {r.type === "education" && <>{item.degree} @ {item.institution}</>}
                              {r.type === "work" && <>{item.role} @ {item.company}</>}
                              {r.type === "links" && <a href={item.url} target="_blank" rel="noopener noreferrer">{item.type}</a>}
                            </li>
                          ))
                        ) : (
                          <li>{r.value}</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Filtered Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-700">Filtered Projects</h2>
                  <ul className="space-y-2">
                    {filteredProjects.map(p => (
                      <li key={p.id} className="bg-gray-50 rounded-lg p-4 shadow">
                        <span className="font-bold">{p.title}</span> - {p.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          {profile.profilePic && (
            <img
              src={typeof profile.profilePic === "string" ? profile.profilePic : URL.createObjectURL(profile.profilePic as File)}
              alt={profile.name || "Profile picture"}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{profile.name}</h1>
            <div className="text-gray-600 mb-3">
              <ReactMarkdown children={profile.bio || ""} remarkPlugins={[remarkGfm]} />
            </div>
            {profile.links?.length > 0 && (
              <div className="flex justify-center md:justify-start gap-3 flex-wrap mt-2">
                {profile.links.map((l) => {
                  const Icon = getIcon(l.type);
                  const username = getUsername(l.url);
                  return (
                    <a
                      key={l.id}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 underline text-sm hover:text-blue-700 transition"
                    >
                      <Icon size={16} className="inline-block" />
                      <span>{username}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Education & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Education</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {profile.education?.map(e => (
                <li key={e.id}>{e.degree} @ {e.institution}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {profile.skills?.map(s => (
                <li key={s.id} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                  {s.name} <span className="text-xs text-gray-600">({s.level})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work Experience */}
        {profile.work?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Work Experience</h2>
            <div className="grid grid-cols-1 gap-4">
              {profile.work.map(w => (
                <div key={w.id} className="bg-gray-50 rounded-xl p-5 shadow hover:shadow-md transition border border-gray-100">
                  <div className="font-bold text-lg text-gray-800 mb-1">
                    <ReactMarkdown children={`### ${w.role}\n**${w.company}**\n*${w.start_date} – ${w.end_date || "Present"}*`} />
                  </div>
                  <div className="text-gray-700">
                    <ReactMarkdown children={w.description || ""} remarkPlugins={[remarkGfm]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects?.map(p => (
              <div key={p.id} className="bg-gray-50 rounded-xl p-5 shadow hover:shadow-md transition border border-gray-100">
                <div className="font-bold text-lg text-gray-800 mb-1">{p.title}</div>
                <p className="text-gray-700 mb-2">{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm hover:text-blue-700 transition">🔗 Project Link</a>}
                {p.tech_stack?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech_stack.map((tech, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
