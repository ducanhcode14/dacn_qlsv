import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createLecturerAccount } from "../controllers/lecturerController.js";

const router = express.Router();

// ✅ Chỉ Admin mới được quyền tạo tài khoản giảng viên
router.post("/create", protect, authorizeRoles("admin"), createLecturerAccount);

export default router;
