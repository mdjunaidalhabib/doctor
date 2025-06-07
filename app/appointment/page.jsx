"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableDates = Array.from({ length: 5 }, (_, i) =>
    dayjs().add(i, "day").format("YYYY-MM-DD")
  );

  const timeSlots = ["10:00 AM", "03:00 PM", "07:00 PM"];

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) {
      alert("তারিখ ও সময় সিলেক্ট করুন");
      return;
    }

    data.date = selectedDate;
    data.timeSlot = selectedTime;

    setLoading(true);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ বুকিং সফল হয়েছে");
        reset();
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        alert("❌ " + result.error);
      }
    } catch (error) {
      alert("❌ একটি সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
        অ্যাপয়েন্টমেন্ট বুকিং ফর্ম
      </h2>

      {/* নাম */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          নাম <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
          placeholder="আপনার নাম লিখুন"
          className="w-full p-3 pl-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* মোবাইল নম্বর */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          মোবাইল নম্বর <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone", {
            required: "মোবাইল নম্বর আবশ্যক",
            pattern: {
              value: /^01[3-9]\d{8}$/,
              message: "বৈধ মোবাইল নম্বর লিখুন",
            },
          })}
          type="tel"
          placeholder="01XXXXXXXXX"
          className="w-full p-3 pl-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* তারিখ নির্বাচন */}
      <div>
        <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
          তারিখ নির্বাচন করুন:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableDates.map((date) => (
            <motion.button
              key={date}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(date)}
              className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all duration-200
                ${
                  selectedDate === date
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                }`}
            >
              {dayjs(date).format("DD MMM, dddd")}
            </motion.button>
          ))}
        </div>
      </div>

      {/* সময় নির্বাচন */}
      <div>
        <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
          সময় নির্বাচন করুন:
        </p>
        <div className="flex gap-3 flex-wrap">
          {timeSlots.map((slot) => (
            <motion.button
              key={slot}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTime(slot)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200
                ${
                  selectedTime === slot
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                }`}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      </div>

      {/* সাবমিট বাটন */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-violet-700 hover:bg-fuchsia-600 text-white py-2 rounded-xl font-semibold shadow-md transition"
        disabled={loading}
      >
        {loading ? "প্রসেসিং..." : "✅ বুকিং করুন"}
      </motion.button>
    </motion.form>
  );
}
// className = "px-0 lg:px-3 inline-block py-1 w-full shadow-xl lg:m-3 sm:w-fit rounded-full bg-violet-700 hover:bg-fuchsia-600 text-white mt-3 text-center";
