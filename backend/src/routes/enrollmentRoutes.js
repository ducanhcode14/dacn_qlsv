// backend/src/routes/enrollmentRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  enrollSection,
  cancelEnrollment,
  getMyEnrollments,
} from "../controllers/enrollmentController.js";

const router = express.Router();

// Sinh viên đăng ký / xem học phần
router.post("/", protect, authorizeRoles("student"), enrollSection);
router.get("/me", protect, authorizeRoles("student"), getMyEnrollments);
router.delete("/:enrollmentId", protect, authorizeRoles("student"), cancelEnrollment);

export default router;
