import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.discordId) {
    return NextResponse.json({ authorized: false });
  }

  await connectToDatabase().then((res) => {
    console.log("Database connected:", res.connection.name);
  });

  console.log("Session user discordId:", session.user.discordId);

  const admin = await User.findOne({
    discordId: session.user.discordId,
  });

  console.log("admin", admin);

  if (!admin) {
    return NextResponse.json({ authorized: false });
  }

  return NextResponse.json({
    authorized: true,
    admin,
  });
}
