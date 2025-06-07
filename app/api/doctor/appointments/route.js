import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Appointment from "../../../lib/models/Appointment";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const status = searchParams.get("status");

  let query = {};

  if (date) {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    query.date = { $gte: selectedDate, $lt: nextDate };
  }

  if (status && status !== "all") {
    query.status = status;
  }

  const appointments = await Appointment.find(query).sort({
    date: 1,
    timeSlot: 1,
  });
  return NextResponse.json(appointments);
}
