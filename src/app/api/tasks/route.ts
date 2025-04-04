import { NextResponse } from "next/server";
import { taskServices } from "@/lib/server/services/tasks_service";
import { TaskCreationData } from "@/lib/server/db/repositories/tasks";

export async function POST(request: Request) {
  // Create new Task
  const data:TaskCreationData = await request.json();

  const taskCreationResponse = await taskServices.createTask(data);

  if (taskCreationResponse.error) {
    return NextResponse.json(
      { message: "Error creating task", error: taskCreationResponse.error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Task created successfully", error: null },
    { status: 201 }
  );
}

export async function GET() {
    // Get all labels
    const tasks = await taskServices.findAll();
  
    return NextResponse.json(
      {
        data: {
          labels: tasks.data,
          error: tasks.error,
        },
      },
      { status: tasks.error ? 500 : 200 }
    );
  }
