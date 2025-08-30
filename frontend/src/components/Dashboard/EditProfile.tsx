import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profile";
import type { Profile } from "../../types/models";

export default function EditProfile() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile();
      setProfile({
        name: data.name,
        bio: data.bio,
        email: data.email,
        profilePic: data.profilePic,
        id: data.id,
      });
      setLoading(false);
    }
    fetchProfile();
  }, []);

  async function handleSave() {
    if (!profile.id) return;
    setSaving(true);
    const formData = new FormData();
    if (profile.name) formData.append("name", profile.name);
    if (profile.bio) formData.append("bio", profile.bio);
    if (profile.profilePic instanceof File) formData.append("profilePic", profile.profilePic);
    if (profile.email) formData.append("email", profile.email);

    const updated = await updateProfile(profile.id, formData);
    setProfile({
      ...profile,
      name: updated.name,
      bio: updated.bio,
      profilePic: updated.profilePic,
    });
    setSaving(false);
  }

  if (loading) return <p className="text-center py-12 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          className="w-full h-40 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && setProfile({ ...profile, profilePic: e.target.files[0] })
          }
        />
        {profile.profilePic && typeof profile.profilePic === "string" && (
          <img src={profile.profilePic} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover" />
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
