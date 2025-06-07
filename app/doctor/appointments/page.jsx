"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("all");

  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    done: 0,
    cancelled: 0,
  });

  const fetchAppointments = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (status) params.append("status", status);

    const res = await fetch(`/api/doctor/appointments?${params.toString()}`);
    const data = await res.json();
    setAppointments(data);

    // Summary হিসাব
    const counts = {
      total: data.length,
      pending: data.filter((a) => a.status === "pending").length,
      done: data.filter((a) => a.status === "done").length,
      cancelled: data.filter((a) => a.status === "cancelled").length,
    };
    setSummary(counts);

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [date, status]);

  const updateStatus = async (id, newStatus) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-4">
          <p>
            আপনি কি নিশ্চিত যে এই অ্যাপয়েন্টমেন্টটি "{newStatus}" করতে চান?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performUpdate(id, newStatus);
              }}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              হ্যাঁ
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              না
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center", // ✅ এখানে position সেট করা হয়েছে
      }
    );
  };

  const performUpdate = async (id, newStatus) => {
    const toastId = toast.loading("⏳ স্ট্যাটাস আপডেট হচ্ছে...", {
      position: "top-center", // ✅ এখানে position সেট করা হয়েছে
    });

    try {
      const res = await fetch(`/api/doctor/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success("✅ স্ট্যাটাস সফলভাবে আপডেট হয়েছে", {
          id: toastId,
          position: "top-center", // ✅ এখানে position সেট করা হয়েছে
        });
        fetchAppointments();
      } else {
        const result = await res.json();
        toast.error("❌ স্ট্যাটাস আপডেট ব্যর্থ: " + result.error, {
          id: toastId,
          position: "top-center", // ✅ এখানে position সেট করা হয়েছে
        });
      }
    } catch (error) {
      toast.error("❌ অনাকাঙ্ক্ষিত সমস্যা হয়েছে", {
        id: toastId,
        position: "top-center", // ✅ এখানে position সেট করা হয়েছে
      });
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📋 অ্যাপয়েন্টমেন্ট তালিকা
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6 space-y-4 md:space-y-0">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">সব</option>
          <option value="pending">পেন্ডিং</option>
          <option value="done">ডান</option>
          <option value="cancelled">বাতিল</option>
        </select>
        <button
          onClick={() => {
            setDate("");
            setStatus("all");
          }}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          রিসেট
        </button>
      </div>

      {/* Summary Count Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div className="bg-blue-100 text-blue-800 rounded-lg py-2 font-semibold">
          মোট: {summary.total}
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-lg py-2 font-semibold">
          Pending: {summary.pending}
        </div>
        <div className="bg-green-100 text-green-800 rounded-lg py-2 font-semibold">
          Done: {summary.done}
        </div>
        <div className="bg-red-100 text-red-800 rounded-lg py-2 font-semibold">
          Cancelled: {summary.cancelled}
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <p>লোড হচ্ছে...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">
          কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="p-4 border rounded-xl shadow-sm space-y-2 bg-white dark:bg-gray-800"
            >
              <p>
                <strong>👤 নাম:</strong> {appt.name}
              </p>
              <p>
                <strong>📞 ফোন:</strong> {appt.phone}
              </p>
              <p>
                <strong>📅 তারিখ:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <strong>🕒 সময়:</strong> {appt.timeSlot}
              </p>
              <p>
                <strong>📌 অবস্থা:</strong>{" "}
                <span className={`font-bold ${getStatusColor(appt.status)}`}>
                  {appt.status}
                </span>
              </p>

              {/* ✅ Status Update Buttons */}
              {appt.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(appt._id, "done")}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    ✅ Done
                  </button>
                  <button
                    onClick={() => updateStatus(appt._id, "cancelled")}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function getStatusColor(status) {
  if (status === "done") return "text-green-600";
  if (status === "cancelled") return "text-red-500";
  return "text-yellow-600";
}
