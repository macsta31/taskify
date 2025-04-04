const mockProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Redesign the company website with modern UI/UX",
    status: "In Progress",
    taskCount: 5
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android",
    status: "Planning",
    taskCount: 8
  },
  {
    id: "3",
    title: "API Integration",
    description: "Integrate third-party APIs into our platform",
    status: "Completed",
    taskCount: 3
  }
]

export default function Projects() {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Projects</h1>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white">
            Create Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map(project => (
            <div key={project.id} className="bg-gray-700 p-6 rounded-md hover:shadow-md hover:shadow-green-400/10 border border-gray-600 hover:border-green-400 transition-all">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-300 mt-2">{project.description}</p>
              <div className="mt-4 flex justify-between">
                <span className="text-sm text-gray-400">{project.taskCount} tasks</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300" :
                  project.status === "Planning" ? "bg-blue-500/20 text-blue-300" :
                  "bg-green-500/20 text-green-300"
                }`}>{project.status}</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-sm text-green-400 hover:text-green-300 cursor-pointer">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }