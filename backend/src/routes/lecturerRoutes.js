// backend/src/routes/lecturerRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  createLecturerAccount,
  getLecturers,
} from "../controllers/lecturerController.js";

const router = express.Router();

// Chỉ Admin mới được quyền tạo tài khoản giảng viên
router.post("/create", protect, authorizeRoles("admin"), createLecturerAccount);

// Danh sách giảng viên
router.get("/", protect, authorizeRoles("admin"), getLecturers);

export default router;
