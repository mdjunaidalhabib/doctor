// pages/api/test.js

import connectDB from "@/lib/mongoose";

export default async function handler(req, res) {
  await connectDB();

  res.json({ message: "MongoDB connected successfully!" });
}
