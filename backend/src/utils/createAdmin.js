// backend/src/utils/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error("❌ Vui lòng cấu hình MONGO_URI trong .env");
  process.exit(1);
}

async function createAdmin() {
  try {
    await mongoose.connect(MONGO, {});

    console.log("✅ Kết nối MongoDB thành công (createAdmin)");

    const exists = await User.findOne({ username: "admin" });
    if (exists) {
      console.log("⚠️ Admin đã tồn tại, không tạo lại");
      process.exit(0);
    }

    // Mật khẩu có thể hash ở đây hoặc dựa vào pre('save') trong model.
    // Model hiện có pre('save') để hash - vì vậy ta có thể tạo trực tiếp (không double-hash).
    const admin = new User({
      username: "admin",
      password: "admin123", // model sẽ hash trước khi save
      fullName: "Quản trị viên",
      role: "admin",
    });

    await admin.save();

    console.log("✅ Tạo tài khoản admin thành công: admin / admin123");
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi khi tạo admin:", err);
    process.exit(1);
  }
}

createAdmin();
