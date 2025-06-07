
// app/api/timeslots/route.js
import connectDB from "../../lib/db";
import Timeslot from "../../lib/models/TimeSlot";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return new Response(JSON.stringify({ error: "Date is required" }), {
      status: 400,
    });
  }

  const timeSlot = await Timeslot.findOne({ date });
  return new Response(
    JSON.stringify(timeSlot || { date, slots: [], closed: false }),
    {
      status: 200,
    }
  );
}

export async function POST(req) {
  await connectDB();
  const { date, slots, closed } = await req.json();

  if (!date || !slots) {
    return new Response(
      JSON.stringify({ error: "Date and slots are required" }),
      {
        status: 400,
      }
    );
  }

  // আগে একই date এর ডাটা থাকলে ডিলিট করে নতুন তৈরি করব (বা আপডেট করব)
  const existing = await Timeslot.findOne({ date });
  if (existing) {
    existing.slots = slots;
    existing.closed = closed || false;
    await existing.save();
    return new Response(JSON.stringify(existing), { status: 200 });
  }

  const newTimeslot = await Timeslot.create({
    date,
    slots,
    closed: closed || false,
  });
  return new Response(JSON.stringify(newTimeslot), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { date, time, available, closed } = await req.json();

  const timeSlot = await Timeslot.findOne({ date });

  if (!timeSlot) {
    return new Response(
      JSON.stringify({ error: "Slot not found for this date" }),
      { status: 404 }
    );
  }

  if (typeof closed === "boolean") {
    // দিন পুরো বন্ধ/খোলা করা হচ্ছে
    timeSlot.closed = closed;
  }

  if (time) {
    // নির্দিষ্ট টাইম স্লটের অবস্থা পরিবর্তন
    const slot = timeSlot.slots.find((s) => s.time === time);
    if (!slot) {
      return new Response(JSON.stringify({ error: "Time slot not found" }), {
        status: 404,
      });
    }
    slot.available = available;
  }

  await timeSlot.save();

  return new Response(
    JSON.stringify({ message: "Updated successfully", timeSlot }),
    {
      status: 200,
    }
  );
}
