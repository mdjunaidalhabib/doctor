// app/api/appointment/route.js
import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Appointment from "../../lib/models/Appointment";

import Timeslot from "../../lib/models/";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  const { name, phone, date, timeSlot } = req.body;

  if (!name || !phone || !date || !timeSlot) {
    return res.status(400).json({ error: "সব তথ্য পূরণ করুন" });
  }

  try {
    // Check if the timeslot is available
    const slot = await Timeslot.findOne({
      date,
      time: timeSlot,
      isBooked: false,
    });
    if (!slot) {
      return res
        .status(400)
        .json({ error: "এই টাইম স্লট ইতিমধ্যে বুক করা হয়েছে বা উপলব্ধ নেই" });
    }

    // Create booking logic here (save to Booking collection etc)
    // উদাহরণস্বরূপ:
    // await Booking.create({ name, phone, date, timeSlot });

    // Mark timeslot as booked
    slot.isBooked = true;
    await slot.save();

    res.status(200).json({ message: "বুকিং সফল হয়েছে" });
  } catch (err) {
    res.status(500).json({ error: "সার্ভার এ সমস্যা হয়েছে" });
  }
}
