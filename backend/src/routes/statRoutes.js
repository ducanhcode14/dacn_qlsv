// backend/src/routes/statRoutes.js
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Section from "../models/Section.js";

const router = express.Router();

// API thống kê (chỉ admin)
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: "student" });
    const lecturerCount = await User.countDocuments({ role: "lecturer" });
    const courseCount = await Course.countDocuments();
    const sectionCount = await Section.countDocuments();
    res.json({ studentCount, lecturerCount, courseCount, sectionCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
