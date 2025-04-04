import { NextResponse } from "next/server";
import { labelServices } from "@/lib/server/services/labels_service";
import { LabelCreationData } from "@/lib/server/db/repositories/labels";

export async function POST(request: Request) {
  // Create new Label
  const data:LabelCreationData = await request.json();

  const labelCreationResponse = await labelServices.createLabel(data);
  return NextResponse.json(
    {
      data: {
        message: labelCreationResponse.error
          ? "Error creating label"
          : "Label created succesfully",
        error: labelCreationResponse.error,
      },
    },
    { status: labelCreationResponse.error ? 500 : 201 }
  );
}

export async function GET() {
  // Get all labels
  const labels = await labelServices.findAll();

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
