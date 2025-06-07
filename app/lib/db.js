
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ MongoDB already connected.");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully!");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection failed!");
        console.error(err);
        throw err; // যাতে API-তেও error ধরা পড়ে
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.conn = null;
  }

  return cached.conn;
}

export default connectDB;
