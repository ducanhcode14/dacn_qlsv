// backend/src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ Chưa cấu hình MONGO_URI trong .env");
      process.exit(1);
    }

    await mongoose.connect(uri, {});
    console.log("✅ Kết nối MongoDB thành công (db.js)");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  }
};
