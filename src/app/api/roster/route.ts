import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import Roster from "@/models/Roster";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const players = await Roster.find().sort({ createdAt: -1 });
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("Error fetching roster:", error);
    return NextResponse.json(
      { error: "Failed to fetch roster" },
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
    const { name, rank, position } = await req.json();
    await connectToDatabase();
    const newPlayer = new Roster({
      name,
      rank,
      position,
    });
    await newPlayer.save();
    return NextResponse.json(
      { message: "Player added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding player:", error);
    return NextResponse.json(
      { error: "Failed to add player" },
      { status: 500 },
    );
  }
}
