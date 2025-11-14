// backend/src/routes/studentRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  createStudent,
  getStudents,
  getMyStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

// Admin quản lý sinh viên
router.post("/", protect, authorizeRoles("admin"), createStudent);
router.get("/", protect, authorizeRoles("admin"), getStudents);

// Sinh viên xem hồ sơ của chính mình
router.get("/me", protect, authorizeRoles("student"), getMyStudentProfile);

export default router;
