import EditProfile from "../components/Dashboard/EditProfile";
import Navbar from "../components/Public/Navbar";
import EducationManager from "../components/Dashboard/EducationManager";
import LinkManager from "../components/Dashboard/LinkManager";
import ProjectManager from "../components/Dashboard/ProjectManager";
import SkillManager from "../components/Dashboard/SkillManager";
import WorkManager from "../components/Dashboard/WorkManager";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Dashboard</h1>

        {/* Wrap all sections in a container with consistent width */}
        <div className="w-full max-w-4xl flex flex-col">
          {/* Each section has full width and consistent styling */}
          <div className="w-full">
            <EditProfile />
          </div>

          <div className="flex items-center justify-center bg-gray-100">
            <SkillManager />
          </div>

          <div className="flex items-center justify-center bg-gray-100">
            <EducationManager />
          </div>

          <div className="flex items-center justify-center bg-gray-100">
            <WorkManager />
          </div>

          <div className="flex items-center justify-center bg-gray-100">
            <ProjectManager />
          </div>

          <div className="flex items-center justify-center bg-gray-100">
            <LinkManager />
          </div>
        </div>
      </div>
    </div>
  );
}
