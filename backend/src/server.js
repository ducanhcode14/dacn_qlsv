import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import lecturerRoutes from "./routes/lecturerRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ thêm route phân quyền admin

dotenv.config();
const app = express();

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Kết nối MongoDB Atlas ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// ====== Routes ======
app.use("/api/auth", authRoutes);          // Đăng ký, đăng nhập
app.use("/api/lecturers", lecturerRoutes); // Route giảng viên
app.use("/api/users", userRoutes);         // ✅ Route phân quyền admin-only

// ====== Root route ======
app.get("/", (req, res) => {
  res.send("🚀 API đang hoạt động bình thường!");
});

// ====== Khởi động server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server chạy tại cổng ${PORT}`));
