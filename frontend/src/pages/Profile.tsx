import ProfileView from "../components/Public/ProfileView";
import Navbar from "../components/Public/Navbar";

export default function Profile() {
  return (
    <div className="min-h-fit bg-gray-100">
      <Navbar />
      <ProfileView />
    </div>
  );
}
