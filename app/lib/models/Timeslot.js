import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: String,
  available: { type: Boolean, default: true },
});

const daySlotSchema = new mongoose.Schema({
  date: String, // YYYY-MM-DD
  slots: [slotSchema],
  closed: { type: Boolean, default: false }, // যদি দিন পুরোটা বন্ধ থাকে
});

const Timeslot =
  mongoose.models.DaySlot || mongoose.model("DaySlot", daySlotSchema);

export default Timeslot;
