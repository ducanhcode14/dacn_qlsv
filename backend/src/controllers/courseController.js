// backend/src/controllers/courseController.js
import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { maMon, tenMon, soTinChi, moTa } = req.body;

    const exists = await Course.findOne({ maMon });
    if (exists) {
      return res.status(400).json({ message: "Mã môn đã tồn tại" });
    }

    const course = await Course.create({ maMon, tenMon, soTinChi, moTa });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ maMon: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Không tìm thấy môn học" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { tenMon, soTinChi, moTa } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Không tìm thấy môn học" });

    if (tenMon !== undefined) course.tenMon = tenMon;
    if (soTinChi !== undefined) course.soTinChi = soTinChi;
    if (moTa !== undefined) course.moTa = moTa;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Không tìm thấy môn học" });

    await course.deleteOne();
    res.json({ message: "Đã xóa môn học" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
