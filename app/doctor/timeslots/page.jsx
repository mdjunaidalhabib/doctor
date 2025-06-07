"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

function TimeInput({ value, onChange }) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");

  useEffect(() => {
    if (value) {
      const parts = value.split(/[: ]/);
      if (parts.length === 3) {
        setHour(parts[0]);
        setMinute(parts[1]);
        setAmpm(parts[2]);
      }
    } else {
      setHour("");
      setMinute("");
      setAmpm("AM");
    }
  }, [value]);

  useEffect(() => {
    if (hour && minute !== "" && (ampm === "AM" || ampm === "PM")) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      onChange && onChange(`${h}:${m} ${ampm}`);
    } else {
      onChange && onChange("");
    }
  }, [hour, minute, ampm, onChange]);

  const hoursOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    ((i + 1) * 5).toString().padStart(2, "0")
  );

  return (
    <div className="flex gap-3 items-center justify-center mb-3">
      <select
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">ঘণ্টা</option>
        {hoursOptions.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <select
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">মিনিট</option>
        {minuteOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={ampm}
        onChange={(e) => setAmpm(e.target.value)}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [daySlot, setDaySlot] = useState({ slots: [], closed: false });
  const [newSlotTime, setNewSlotTime] = useState("");
  const [loading, setLoading] = useState(false);

  const upcomingDates = Array.from({ length: 7 }, (_, i) =>
    dayjs().add(i, "day").format("YYYY-MM-DD")
  );

  async function fetchSlots(date) {
    setLoading(true);
    const res = await fetch(`/api/timeSlots?date=${date}`);
    if (res.ok) {
      const data = await res.json();
      setDaySlot(data);
    } else {
      setDaySlot({ slots: [], closed: false });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  async function addSlot() {
    if (!newSlotTime) return alert("টাইম লিখুন");

    // চেক করো স্লট আগে থেকে আছে কিনা
    if (daySlot.slots.find((s) => s.time === newSlotTime)) {
      return alert("এই টাইম স্লট আগে থেকেই রয়েছে");
    }

    const updatedSlots = [
      ...daySlot.slots,
      { time: newSlotTime, available: true },
    ];

    const res = await fetch("/api/timeSlots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        slots: updatedSlots,
        closed: daySlot.closed,
      }),
    });

    if (res.ok) {
      setNewSlotTime("");
      fetchSlots(selectedDate);
    } else {
      alert("স্লট যোগ করতে সমস্যা হয়েছে");
    }
  }

  async function toggleSlotAvailability(time) {
    const slot = daySlot.slots.find((s) => s.time === time);
    if (!slot) return;

    const res = await fetch("/api/timeSlots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        time,
        available: !slot.available,
      }),
    });

    if (res.ok) {
      fetchSlots(selectedDate);
    } else {
      alert("আপডেট করতে সমস্যা হয়েছে");
    }
  }

  async function toggleDayClosed() {
    const res = await fetch("/api/timeSlots", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        closed: !daySlot.closed,
      }),
    });

    if (res.ok) {
      fetchSlots(selectedDate);
    } else {
      alert("আপডেট করতে সমস্যা হয়েছে");
    }
  }

  // নতুন — ডিলেট স্লট ফাংশন
  async function deleteSlot(time) {
    const updatedSlots = daySlot.slots.filter((s) => s.time !== time);

    const res = await fetch("/api/timeSlots", {
      method: "POST", // তোমার API অনুযায়ী হয়তো PUT বা DELETE হবে, POST ধরি এখানে
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        slots: updatedSlots,
        closed: daySlot.closed,
      }),
    });

    if (res.ok) {
      fetchSlots(selectedDate);
    } else {
      alert("স্লট ডিলেট করতে সমস্যা হয়েছে");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        ডক্টর টাইম স্লট ম্যানেজমেন্ট
      </h1>

      {/* তারিখ সিলেক্টর */}
      <div className="flex justify-center gap-3 mb-6">
        {upcomingDates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedDate === date
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            }`}
          >
            {dayjs(date).format("DD MMM, ddd")}
          </button>
        ))}
      </div>

      {/* দিন বন্ধ/খোলা টগল */}
      <div className="mb-4 text-center">
        <button
          onClick={toggleDayClosed}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            daySlot.closed ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {daySlot.closed
            ? "দিনটি বন্ধ রয়েছে"
            : "দিনটি খোলা রয়েছে (টগল করতে ক্লিক করুন)"}
        </button>
      </div>

      {daySlot.closed && (
        <p className="text-center text-red-500 font-semibold mb-6">
          এই দিনটি বন্ধ রাখা হয়েছে।
        </p>
      )}

      {/* স্লট লিস্ট */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">টাইম স্লটসমূহ:</h2>
        {loading ? (
          <p>লোড হচ্ছে...</p>
        ) : daySlot.slots.length === 0 ? (
          <p>এই দিনে কোনো টাইম স্লট নেই।</p>
        ) : (
          <ul className="space-y-2">
            {daySlot.slots.map(({ time, available }) => (
              <li
                key={time}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-xl"
              >
                <span>{time}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleSlotAvailability(time)}
                    className={`px-3 py-1 rounded-md font-semibold transition ${
                      available
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {available ? "Available" : "Booked"}
                  </button>

                  {/* ডিলেট বাটন */}
                  <button
                    onClick={() => {
                      if (window.confirm(`${time} স্লটটি মুছে ফেলতে চান?`)) {
                        deleteSlot(time);
                      }
                    }}
                    className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* নতুন স্লট যোগ করার ফর্ম */}
      <div>
        <h2 className="text-xl font-semibold mb-2">নতুন টাইম স্লট যোগ করুন:</h2>
        <TimeInput value={newSlotTime} onChange={setNewSlotTime} />
        <button
          onClick={addSlot}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          যোগ করুন
        </button>
      </div>
    </div>
  );
}
