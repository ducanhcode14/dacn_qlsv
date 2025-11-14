// backend/src/routes/scoreRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  upsertScore,
  getScoresByStudent,
  getAllScores,
} from "../controllers/scoreController.js";

const router = express.Router();

// Giảng viên / admin nhập điểm
router.post("/", protect, authorizeRoles("lecturer", "admin"), upsertScore);

// Admin xem tất cả điểm
router.get("/all", protect, authorizeRoles("admin"), getAllScores);

// Xem điểm của 1 sinh viên cụ thể
router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("admin", "student"),
  getScoresByStudent
);

export default router;
