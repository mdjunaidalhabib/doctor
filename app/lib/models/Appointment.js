// lib/models/Appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date: String,
    timeSlot: String,
  },
  { timestamps: true }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
