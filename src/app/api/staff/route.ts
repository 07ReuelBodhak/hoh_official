import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import Staff from "@/models/Staff";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const staff = await Staff.find().sort({ createdAt: -1 });
    return NextResponse.json(staff, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Blog creation failed" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { name, role, discordId, description, image } = body;
    await connectToDatabase();

    const newStaff = new Staff({
      name: name,
      role: role,
      description: description,
      discordId: discordId,
      imageUrl: image,
    });

    await newStaff.save();

    const staff = await Staff.find({});
    console.log(staff);

    return NextResponse.json(
      { message: "Blog created", staff: newStaff },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Blog creation failed" },
      { status: 500 },
    );
  }
}
