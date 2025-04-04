const mockTasks = [
  {
    id: "1",
    title: "Design landing page",
    project: "Website Redesign",
    dueDate: "May 10",
    status: "In Progress"
  },
  {
    id: "2",
    title: "API integration",
    project: "Mobile App",
    dueDate: "May 15",
    status: "Completed"
  },
  {
    id: "3",
    title: "Fix login bug",
    project: "Web Dashboard",
    dueDate: "May 12",
    status: "Blocked"
  }
];

export default function Tasks() {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Tasks</h1>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white">
            Create Task
          </button>
        </div>
        
        <div className="bg-gray-700 rounded-md">
          <div className="grid grid-cols-12 p-4 font-semibold border-b border-gray-600">
            <div className="col-span-5">Task</div>
            <div className="col-span-3">Project</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Status</div>
          </div>
          
          <div className="divide-y divide-gray-600">
            {mockTasks.map(task => (
              <div key={task.id} className="grid grid-cols-12 p-4 hover:bg-gray-600 cursor-pointer">
                <div className="col-span-5">{task.title}</div>
                <div className="col-span-3">{task.project}</div>
                <div className="col-span-2">{task.dueDate}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300" :
                    task.status === "Completed" ? "bg-green-500/20 text-green-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }