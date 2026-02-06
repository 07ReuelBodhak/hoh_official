import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import Result from "@/models/Result";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const results = await Result.find().sort({ datePlayed: -1 });
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  console.log("Received POST request to /api/result");
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { opponent, datePlayed, mode, sets } = await req.json();
    await connectToDatabase();
    const newResult = new Result({
      opponent,
      datePlayed,
      mode,
      sets,
    });
    await newResult.save();
    return NextResponse.json(
      { message: "Result created", result: newResult },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Result creation failed" },
      { status: 500 },
    );
  }
}
