import { redirect } from "next/navigation";
import { projectServices } from "@/lib/server/services/projects_service";

async function createTask(formData: FormData) {
  "use server";

  // Get the form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectId = formData.get("project_id") as string;
  const priority = parseInt(formData.get("priority") as string) || 0;
  const status = formData.get("status") as string;

  // Optional: date fields handling
  let startDate = null;
  const startDateStr = formData.get("start_date") as string;
  if (startDateStr) {
    startDate = new Date(startDateStr);
  }

  let endDate = null;
  const endDateStr = formData.get("end_date") as string;
  if (endDateStr) {
    endDate = new Date(endDateStr);
  }

  // Hours handling
  const estimatedHours =
    parseFloat(formData.get("estimated_duration_hours") as string) || 0;

  try {
    // Call the API to create the task
    const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/tasks`;
    const data = {
      title,
      description,
      project_id: projectId || undefined,
      priority,
      status,
      start_date: startDate,
      end_date: endDate,
      estimated_duration_hours: estimatedHours,
      user_id: "59c32462-6eba-4e84-b8c4-ffb258a927f5", // This would typically come from auth
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error(`Failed to create task: ${errorData.message}`);
    }

    // Redirect to the tasks page after successful creation
    redirect("/dashboard/tasks");
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export default async function NewTask() {
  // Fetch projects for the dropdown
  const { data: projects } = await projectServices.findAll();

  if (!projects) {
    throw "Failed to fetch projects";
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">
          Create New Task
        </h1>
      </div>

      <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg max-w-2xl mx-auto">
        <form action={createTask} className="space-y-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Describe the task"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Project */}
            <div>
              <label
                htmlFor="project_id"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Project
              </label>
              <select
                id="project_id"
                name="project_id"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">-- No Project --</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                defaultValue="0"
              >
                <option value="0">None</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                defaultValue="Pending"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            {/* Estimated Hours */}
            <div>
              <label
                htmlFor="estimated_duration_hours"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Estimated Hours
              </label>
              <input
                type="number"
                id="estimated_duration_hours"
                name="estimated_duration_hours"
                min="0"
                step="0.5"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <a
              href="/dashboard/tasks"
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-md text-white hover:from-green-600 hover:to-cyan-600 transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
