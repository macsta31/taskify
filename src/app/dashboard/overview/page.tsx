import { formatDate, formatRelativeDate, getDeadlineStatusClass, formatDateRange } from "@/lib/client/date-utils";

import { projectServices } from "@/lib/server/services/projects_service";
import { taskServices } from "@/lib/server/services/tasks_service";

// const recentProjects = [
//   {
//     id: "550e8400-e29b-41d4-a716-446655440000",
//     title: "Project Alpha",
//     description: "Building the next-gen platform",
//     deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
//     created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
//     updatedAt: new Date(),
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     _count: {
//       task: 3
//     }
//   },
//   {
//     id: "550e8400-e29b-41d4-a716-446655440001",
//     title: "Project Beta",
//     description: "Internal tools development",
//     deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
//     created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//     updatedAt: new Date(),
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     _count: {
//       task: 1
//     }
//   }
// ];

// const recentTasks = [
//   {
//     id: "991e8400-a29f-41c4-b712-446612340000",
//     title: "Design mockup",
//     description: "Create initial mockups for landing page",
//     status: "pending",
//     priority: 2,
//     start_date: new Date(),
//     end_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
//     estimated_duration_hours: 4,
//     actual_duration_hours: null,
//     created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
//     update_at: new Date(),
//     project_id: "550e8400-e29b-41d4-a716-446655440000",
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     parent_task_id: null,
//     project: {
//       title: "Project Alpha"
//     },
//     labels: [
//       {
//         label: { name: "Design", color: "#38bdf8" }
//       }
//     ]
//   },
//   {
//     id: "991e8400-a29f-41c4-b712-446612340001",
//     title: "API implementation",
//     description: "Implement the REST API endpoints",
//     status: "pending",
//     priority: 1,
//     start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
//     end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // in 3 days
//     estimated_duration_hours: 8,
//     actual_duration_hours: null,
//     created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
//     update_at: new Date(),
//     project_id: "550e8400-e29b-41d4-a716-446655440000",
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     parent_task_id: null,
//     project: {
//       title: "Project Alpha"
//     },
//     labels: [
//       {
//         label: { name: "Backend", color: "#22c55e" }
//       }
//     ]
//   },
//   {
//     id: "991e8400-a29f-41c4-b712-446612340002",
//     title: "Documentation",
//     description: "Write technical documentation",
//     status: "pending",
//     priority: 0,
//     start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // in 3 days
//     end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // in 5 days
//     estimated_duration_hours: 6,
//     actual_duration_hours: null,
//     created_at: new Date(Date.now()),
//     update_at: new Date(),
//     project_id: "550e8400-e29b-41d4-a716-446655440001",
//     user_id: "a385a213-c9c0-4679-a28b-d9fb6fe1f353",
//     parent_task_id: null,
//     project: {
//       title: "Project Beta"
//     },
//     labels: [
//       {
//         label: { name: "Documentation", color: "#a855f7" }
//       }
//     ]
//   }
// ];

export default async function Overview() {

  const {data: recentProjects,} = await projectServices.findAll();
  const {data: recentTasks,} = await taskServices.findAll();

  if(!recentProjects || !recentTasks){
    throw 'AAAA'
  }

  // Sort tasks by due date (earliest first)
  const sortedTasks = [...recentTasks].sort(
    (a, b) => {
      // Handle null dates - null dates go last
      if (!a.end_date) return 1;
      if (!b.end_date) return -1;
      return a.end_date.getTime() - b.end_date.getTime();
    }
  );

  // Get project title by project_id
  const getProjectTitle = (projectId: string | null) => {
    if (!projectId) return "No project";
    const project = recentProjects.find(p => p.id === projectId);
    return project?.title || "Unknown project";
  };

  // Calculate projects timeline
  const now = new Date();
  const calculateProgress = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return 0;
    const total = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    return Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));
  };

  // Get priority label and color
  const getPriorityLabel = (priority:number) => {
    switch(priority) {
      case 3: return { text: "High", class: "bg-red-500/20 text-red-300 border-red-500/30" };
      case 2: return { text: "Medium", class: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" };
      case 1: return { text: "Low", class: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
      default: return { text: "None", class: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">Overview</h1>
      
      {/* Today's Focus Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-5 flex items-center">
          <span className="mr-2 bg-green-400/10 p-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          {"Today's Focus"}
        </h2>
        
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg">
          <div className="space-y-2 divide-y divide-gray-700">
            {sortedTasks.slice(0, 3).map((task, index) => (
              <div key={task.id} className={`${index > 0 ? 'pt-4' : ''} ${index < sortedTasks.length - 1 ? 'pb-4' : ''}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${getPriorityLabel(task.priority).class}`}>
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{task.title}</h3>
                      <p className="text-gray-400 text-sm">{getProjectTitle(task.project_id)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getDeadlineStatusClass(task.end_date)}`}>
                      {formatRelativeDate(task.end_date)}
                    </div>
                    <p className="text-gray-400 text-xs">{task.estimated_duration_hours}h estimated</p>
                  </div>
                </div>
              </div>
            ))}
            
            {sortedTasks.length === 0 && (
              <div className="py-8 text-center text-gray-400">
                <p>No upcoming tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Timeline Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-5 flex items-center">
          <span className="mr-2 bg-green-400/10 p-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
          </span>
          Project Timelines
        </h2>
        
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg">
          <div className="space-y-6">
            {recentProjects.map(project => {
              const progress = calculateProgress(project.created_at, project.deadline);
              
              return (
                <div key={project.id} className="relative">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-white">{project.title}</h3>
                    <span className={getDeadlineStatusClass(project.deadline)}>
                      Due {formatRelativeDate(project.deadline)}
                    </span>
                  </div>
                  
                  {/* Timeline bar */}
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Timeline markers */}
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <div className="flex flex-col items-start">
                      <span>Started</span>
                      <span>{formatDate(project.created_at)}</span>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <span>Now</span>
                      <div className="w-0.5 h-2 bg-white/50 mt-0.5"></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span>Deadline</span>
                      <span>{formatDate(project.deadline)}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-3 flex">
                    <div className="text-gray-400 text-xs flex items-center mr-4">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1"></span>
                      {recentTasks.filter(t => t.project_id === project.id).length} tasks
                    </div>
                    <div className="text-gray-400 text-xs">
                      {progress}% complete
                    </div>
                  </div>
                </div>
              );
            })}
            
            {recentProjects.length === 0 && (
              <div className="py-8 text-center text-gray-400">
                <p>No active projects</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Task Distribution Section */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold text-green-400 mb-5">Upcoming Tasks</h2>
          
          <div className="space-y-3">
            {sortedTasks.map(task => (
              <div 
                key={task.id} 
                className="p-4 bg-gray-800/90 border border-gray-700 rounded-lg hover:border-green-500/50 cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{task.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityLabel(task.priority).class}`}>
                    {getPriorityLabel(task.priority).text}
                  </span>
                </div>
                
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-400">{formatDateRange(task.start_date, task.end_date)}</span>
                  <span className={getDeadlineStatusClass(task.end_date)}>
                    {formatRelativeDate(task.end_date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg">
          <h2 className="text-lg font-semibold text-green-400 mb-5">Project Status</h2>
          
          <div className="space-y-4">
            {recentProjects.map(project => (
              <div key={project.id} className="p-4 bg-gray-800/90 border border-gray-700 rounded-lg">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-1">{project.description}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-cyan-400">{calculateProgress(project.created_at, project.deadline)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                      style={{ width: `${calculateProgress(project.created_at, project.deadline)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between text-xs">
                  <div className="text-gray-400">
                    <div>Created</div>
                    <div>{formatDate(project.created_at)}</div>
                  </div>
                  <div className={getDeadlineStatusClass(project.deadline)}>
                    <div>Deadline</div>
                    <div>{formatDate(project.deadline)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}