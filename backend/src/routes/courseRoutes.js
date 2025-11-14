// backend/src/routes/courseRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Lấy danh sách môn: chỉ cần đăng nhập
router.get("/", protect, getCourses);
router.get("/:id", protect, getCourseById);

// CRUD nâng cao: chỉ admin
router.post("/", protect, authorizeRoles("admin"), createCourse);
router.put("/:id", protect, authorizeRoles("admin"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCourse);

export default router;
