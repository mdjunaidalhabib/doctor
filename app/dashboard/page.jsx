import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">ডাক্তার ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="../doctor/appointments"
          className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold">📅 অ্যাপয়েন্টমেন্ট</h2>
          <p className="text-sm text-gray-500">আজকের ও ভবিষ্যতের বুকিং</p>
        </Link>

        <Link
          href="../doctor/timeslots"
          className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold">🕒 সময়সূচি</h2>
          <p className="text-sm text-gray-500">
            সময় স্লট ও ভেকেশন ম্যানেজ করুন
          </p>
        </Link>

        <Link
          href="/doctor/profile"
          className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold">👤 প্রোফাইল</h2>
          <p className="text-sm text-gray-500">ব্যক্তিগত তথ্য ও সেটিংস</p>
        </Link>
      </div>
    </main>
  );
}
