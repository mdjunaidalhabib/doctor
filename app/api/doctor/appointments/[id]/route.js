import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Appointment from "../../../../lib/models/Appointment";
export async function PUT(req, { params }) {
  await connectDB();

  const { id } = params;
  const { status } = await req.json();

  if (!["pending", "done", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
