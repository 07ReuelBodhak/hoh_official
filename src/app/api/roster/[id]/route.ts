import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

import Roster from "@/models/Roster";
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Roster ID" }, { status: 400 });
    }

    const deletedRoster = await Roster.findByIdAndDelete(id);

    if (!deletedRoster) {
      return NextResponse.json({ error: "Roster not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Roster deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 },
    );
  }
}
