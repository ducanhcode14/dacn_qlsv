// backend/src/routes/sectionRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/sectionController.js";

const router = express.Router();

// Ai đăng nhập cũng có thể xem danh sách lớp học phần
router.get("/", protect, getSections);
router.get("/:id", protect, getSectionById);

// Admin quản lý
router.post("/", protect, authorizeRoles("admin"), createSection);
router.put("/:id", protect, authorizeRoles("admin"), updateSection);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSection);

export default router;
