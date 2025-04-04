import { formatDate, getDeadlineStatusClass } from "@/lib/client/date-utils";
import { projectServices } from "@/lib/server/services/projects_service";
import { taskServices } from "@/lib/server/services/tasks_service";
import Link from "next/link";

// const projects = [
//   {
//     id: "550e8400-e29b-41d4-a716-446655440010",
//     title: "Website Redesign",
//     description: "Redesign the company website with modern UI/UX",
//     deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
//     created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
//     updatedAt: new Date(),
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     status: "In Progress",
//     _count: {
//       task: 5
//     }
//   },
//   {
//     id: "550e8400-e29b-41d4-a716-446655440011",
//     title: "Mobile App Development",
//     description: "Develop a new mobile app for iOS and Android",
//     deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
//     created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
//     updatedAt: new Date(),
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     status: "Planning",
//     _count: {
//       task: 8
//     }
//   },
//   {
//     id: "550e8400-e29b-41d4-a716-446655440012",
//     title: "API Integration",
//     description: "Integrate third-party APIs into our platform",
//     deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago (completed)
//     created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
//     updatedAt: new Date(),
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     status: "Completed",
//     _count: {
//       task: 3
//     }
//   }
// ]

export default async function Projects() {
  const {data: projects, } = await projectServices.findAll();
  const {data: tasks, } = await taskServices.findAll();

  if(!projects || !tasks){
    throw 'AAAA'
  }
  
  // Count tasks for each project
  const getTaskCount = (projectId: string) => {
    return tasks.filter(task => task.project_id === projectId).length;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">Projects</h1>
        <Link className="bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-md text-white hover:from-green-600 hover:to-cyan-600 shadow-lg hover:shadow-green-500/25 transition-all" href={'/dashboard/projects/new'}>
          Create Project
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800/80 p-6 rounded-lg hover:shadow-lg hover:shadow-green-400/10 border border-gray-700 hover:border-green-400/50 transition-all backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
            <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">{getTaskCount(project.id)} tasks</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300" :
                project.status === "Planning" ? "bg-blue-500/20 text-blue-300" :
                "bg-green-500/20 text-green-300"
              }`}>{project.status}</span>
            </div>
            <div className="mt-2 text-xs">
              {project.deadline && (
                <span className={getDeadlineStatusClass(project.deadline)}>
                  Due: {formatDate(project.deadline)}
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-end ">
              <button className="text-sm text-green-400 hover:text-green-300 cursor-pointer group-hover:translate-x-1 transition-transform flex items-center">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}