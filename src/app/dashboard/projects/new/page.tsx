import { redirect } from "next/navigation";

async function createProject(formData: FormData) {
  "use server";

  // Get the form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // Optional: deadline field handling
  let deadline = null;
  const deadlineStr = formData.get("deadline") as string;
  if (deadlineStr) {
    deadline = new Date(deadlineStr);
  }

  try {
    // Call the API to create the project
    const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects`;
    const data = {
      title,
      description,
      deadline,
      user_id: "59c32462-6eba-4e84-b8c4-ffb258a927f5",
    };
    console.log(url, data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    // Redirect to the projects page after successful creation
    redirect("/dashboard/projects");
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export default function NewProject() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 inline-block pb-1">
          Create New Project
        </h1>
      </div>

      <div className="bg-gray-800/70 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg max-w-2xl mx-auto">
        <form action={createProject} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter project title"
              required
            />
          </div>

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
              placeholder="Describe the project"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                defaultValue="Planning"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Deadline (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <a
              href="/dashboard/projects"
              className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-md text-white hover:from-green-600 hover:to-cyan-600 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
