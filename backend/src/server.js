// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import statRoutes from "./routes/statRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import lecturerRoutes from "./routes/lecturerRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import courseRoutes from "./routes/courseRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

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
app.use("/api/auth", authRoutes);           // Đăng ký, đăng nhập
app.use("/api/lecturers", lecturerRoutes);  // Giảng viên
app.use("/api/users", userRoutes);          // Admin xem tất cả user
app.use("/api/stats", statRoutes);          // Thống kê

app.use("/api/courses", courseRoutes);      // Môn học
app.use("/api/sections", sectionRoutes);    // Lớp học phần
app.use("/api/students", studentRoutes);    // Sinh viên
app.use("/api/enrollments", enrollmentRoutes); // Đăng ký học phần
app.use("/api/scores", scoreRoutes);        // Điểm

// Root route
app.get("/", (req, res) => {
  res.send("🚀 API đang hoạt động bình thường!");
});

// Error handler
app.use(notFound);
app.use(errorHandler);

// ====== Khởi động server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server chạy tại cổng ${PORT}`));
