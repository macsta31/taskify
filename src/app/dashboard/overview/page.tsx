const mockRecentProjects = [
  {
    id: "1",
    title: "Project Alpha",
    pendingTasks: 3
  },
  {
    id: "2",
    title: "Project Beta",
    pendingTasks: 1
  }
];

const mockRecentTasks = [
  {
    id: "1",
    title: "Design mockup",
    dueDate: "tomorrow"
  },
  {
    id: "2",
    title: "API implementation",
    dueDate: "in 3 days"
  },
  {
    id: "3",
    title: "Documentation",
    dueDate: "in 5 days"
  }
];

export default function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">Overview</h1>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.1)] transition-all duration-500 group">
          <h2 className="text-xl font-semibold text-green-400 mb-5 flex items-center">
            <span className="mr-2 bg-green-400/10 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <path d="M2 17 12 22 22 17"></path>
                <path d="M2 12 12 17 22 12"></path>
                <path d="M12 2 2 7 12 12 22 7 12 2Z"></path>
              </svg>
            </span>
            Recent Projects
          </h2>
          <div className="space-y-3">
            {mockRecentProjects.map(project => (
              <div key={project.id} className="p-4 bg-gray-800/90 border border-gray-700 rounded-lg hover:border-green-500/50 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2"></span>
                  {project.pendingTasks} tasks pending
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.1)] transition-all duration-500 group">
          <h2 className="text-xl font-semibold text-green-400 mb-5 flex items-center">
            <span className="mr-2 bg-green-400/10 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m9 9 3.5 3.5L9 16" />
              </svg>
            </span>
            Recent Tasks
          </h2>
          <div className="space-y-3">
            {mockRecentTasks.map(task => (
              <div key={task.id} className="p-4 bg-gray-800/90 border border-gray-700 rounded-lg hover:border-green-500/50 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <h3 className="font-semibold text-white">{task.title}</h3>
                <p className="text-gray-400 text-sm mt-1 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block mr-2"></span>
                  Due {task.dueDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}