import { NextResponse } from "next/server";
import { taskLabelServices } from "@/lib/server/services/task_labels_service";
import { TaskLabelCreationData } from "@/lib/server/db/repositories/task_labels";

export async function POST(request: Request) {
  // Create new task label
  const data:TaskLabelCreationData = await request.json();

  const taskLabelCreationResponse = await taskLabelServices.createTaskLabel(data);

  if (taskLabelCreationResponse.error) {
    return NextResponse.json(
      { message: "Error creating task label", error: taskLabelCreationResponse.error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Task Label created successfully", error: null },
    { status: 201 }
  );
}

export async function GET() {
  // Get all labels
  return NextResponse.json({ message: "", error: null }, { status: 200 });
}
