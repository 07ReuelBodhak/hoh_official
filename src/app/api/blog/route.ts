import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const blogs = await Blog.find({ createdBy: session.user.discordId })
      .sort({
        createdAt: -1,
      })
      .lean();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
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
    const { title, content, coverImage } = await req.json();

    await connectToDatabase();

    const newBlog = await Blog.create({
      title,
      content,
      coverImage,
      author: session.user.name || "Unknown Author",
      authorPfp: session.user.image || "default ",
      createdBy: session.user.discordId,
    });

    return NextResponse.json(
      { message: "Blog created", blog: newBlog },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Blog creation failed" },
      { status: 500 },
    );
  }
}
