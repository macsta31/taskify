import { NextResponse } from "next/server";
import { projectServices } from "@/lib/server/services/projects_service";
import { ProjectCreationData } from "@/lib/server/db/repositories/projects";

export async function POST(request: Request) {

  // Create new Project
  const data:ProjectCreationData = await request.json();

  const projectCreationResponse = await projectServices.createProject(data);

  if (projectCreationResponse.error) {
    return NextResponse.json(
      { message: "Error creating project", error: projectCreationResponse.error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Project created successfully", error: null },
    { status: 201 }
  );
}

export async function GET() {
  // Get all labels
  const labels = await projectServices.findAll();

  return NextResponse.json(
    {
      data: {
        labels: labels.data,
        error: labels.error,
      },
    },
    { status: labels.error ? 500 : 200 }
  );
}
