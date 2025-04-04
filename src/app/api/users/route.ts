import { NextResponse } from "next/server";
import { userServices } from "@/lib/server/services/users_service";
import { UserCreationData } from "@/lib/server/db/repositories/users";

export async function POST(request: Request) {
  // Create new user
  const data: UserCreationData = await request.json();


  const userCreationResponse = await userServices.createUser(data)

  console.log("error response error")

  if (userCreationResponse.error) {
    return NextResponse.json(
      { message: "Error creating user", error: userCreationResponse.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User created successfully", error: null },
    { status: 201 }
  );
}

export async function GET() {
  // Get all labels
  const users = await userServices.findAll();

  return NextResponse.json(
    {
      data: {
        users: users.data,
        error: users.error,
      },
    },
    { status: users.error ? 500 : 200 }
  );
}
