// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  timeSlot: String,
  status: {
    type: String,
    enum: ["pending", "done", "cancelled"],
    default: "pending",
  },
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
