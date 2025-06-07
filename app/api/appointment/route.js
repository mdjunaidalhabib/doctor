// app/api/appointment/route.js
import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { Appointment } from "../../lib/models/Appointment";

export async function POST(req) {
  try {
    await connectDB();
    const { name, phone, date, timeSlot } = await req.json();

    const exists = await Appointment.findOne({ date, timeSlot });
    if (exists) {
      return NextResponse.json(
        { error: "এই সময়টি আগেই বুক করা হয়েছে" },
        { status: 400 }
      );
    }

    const booking = await Appointment.create({ name, phone, date, timeSlot });
    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি" }, { status: 500 });
  }
}
