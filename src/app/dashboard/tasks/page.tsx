import { formatDate, getDeadlineStatusClass } from "@/lib/client/date-utils";

const mockTasks = [
  {
    id: "991e8400-a29f-41c4-b712-446612340020",
    title: "Design landing page",
    description: "Create responsive design for the landing page",
    status: "In Progress",
    priority: 2,
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // in 5 days (May 10)
    estimated_duration_hours: 6,
    actual_duration_hours: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    update_at: new Date(),
    project_id: "550e8400-e29b-41d4-a716-446655440010",
    user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
    parent_task_id: null,
    project: {
      title: "Website Redesign"
    },
    labels: [
      {
        label: { name: "Design", color: "#38bdf8" }
      },
      {
        label: { name: "Frontend", color: "#f472b6" }
      }
    ]
  },
  {
    id: "991e8400-a29f-41c4-b712-446612340021",
    title: "API integration",
    description: "Integrate payment gateway API",
    status: "Completed",
    priority: 1,
    start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // in 10 days (May 15)
    estimated_duration_hours: 8,
    actual_duration_hours: 7,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    update_at: new Date(),
    project_id: "550e8400-e29b-41d4-a716-446655440011",
    user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
    parent_task_id: null,
    project: {
      title: "Mobile App"
    },
    labels: [
      {
        label: { name: "Backend", color: "#22c55e" }
      }
    ]
  },
  {
    id: "991e8400-a29f-41c4-b712-446612340022",
    title: "Fix login bug",
    description: "Resolve authentication issues affecting some users",
    status: "Blocked",
    priority: 3,
    start_date: new Date(Date.now()),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in 7 days (May 12)
    estimated_duration_hours: 3,
    actual_duration_hours: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    update_at: new Date(),
    project_id: "550e8400-e29b-41d4-a716-446655440012",
    user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
    parent_task_id: null,
    project: {
      title: "Web Dashboard"
    },
    labels: [
      {
        label: { name: "Bug", color: "#ef4444" }
      },
      {
        label: { name: "Security", color: "#a855f7" }
      }
    ]
  }
];

export default function Tasks() {
  // Get priority label
  const getPriorityLabel = (priority: number) => {
    switch(priority) {
      case 3: return { text: "High", class: "bg-red-500/20 text-red-300" };
      case 2: return { text: "Medium", class: "bg-yellow-500/20 text-yellow-300" };
      case 1: return { text: "Low", class: "bg-blue-500/20 text-blue-300" };
      default: return { text: "None", class: "bg-gray-500/20 text-gray-300" };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">Tasks</h1>
        <button className="bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-md text-white hover:from-green-600 hover:to-cyan-600 shadow-lg hover:shadow-green-500/25 transition-all">
          Create Task
        </button>
      </div>
      
      <div className="bg-gray-800/70 rounded-lg backdrop-blur-sm border border-gray-700">
        <div className="grid grid-cols-12 p-4 font-semibold border-b border-gray-600 text-green-400">
          <div className="col-span-4">Task</div>
          <div className="col-span-2">Project</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-2">Status</div>
        </div>
        
        <div className="divide-y divide-gray-700">
          {mockTasks.map(task => (
            <div key={task.id} className="grid grid-cols-12 p-4 hover:bg-gray-700/50 cursor-pointer transition-colors">
              <div className="col-span-4">
                <div className="font-medium text-white">{task.title}</div>
                {task.labels && task.labels.length > 0 && (
                  <div className="mt-1 flex gap-1">
                    {task.labels.map((taskLabel, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-2 py-0.5 rounded-full" 
                        style={{ backgroundColor: `${taskLabel.label.color}20`, color: taskLabel.label.color }}
                      >
                        {taskLabel.label.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-span-2 flex items-center text-gray-300">{task.project?.title}</div>
              <div className="col-span-2 flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityLabel(task.priority).class}`}>
                  {getPriorityLabel(task.priority).text}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`text-sm ${getDeadlineStatusClass(task.end_date)}`}>{formatDate(task.end_date)}</span>
              </div>
              <div className="col-span-2 flex items-center">
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