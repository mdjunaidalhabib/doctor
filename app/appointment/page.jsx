// app/appointment/page.jsx
"use client";
import { useForm } from "react-hook-form";

export default function AppointmentPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) alert("✅ বুকিং সফল হয়েছে");
    else alert("❌ " + result.error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        {...register("name")}
        placeholder="নাম"
        className="w-full border p-2"
        required
      />
      <input
        {...register("phone")}
        placeholder="মোবাইল নম্বর"
        className="w-full border p-2"
        required
      />
      <input
        {...register("date")}
        type="date"
        className="w-full border p-2"
        required
      />
      <select {...register("timeSlot")} className="w-full border p-2" required>
        <option value="">সময় সিলেক্ট করুন</option>
        <option>10:00 AM</option>
        <option>11:00 AM</option>
        <option>12:00 PM</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        বুকিং করুন
      </button>
    </form>
  );
}

