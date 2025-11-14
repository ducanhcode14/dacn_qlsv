// backend/src/controllers/sectionController.js
import Section from "../models/Section.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { isValidObjectId } from "../utils/validate.js";

export const createSection = async (req, res) => {
  try {
    const { maLop, tenLop, monHoc, giangVien, lichHoc } = req.body;

    const exists = await Section.findOne({ maLop });
    if (exists) {
      return res.status(400).json({ message: "Mã lớp học phần đã tồn tại" });
    }

    if (!isValidObjectId(monHoc)) {
      return res.status(400).json({ message: "ID môn học không hợp lệ" });
    }

    const course = await Course.findById(monHoc);
    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy môn học" });
    }

    if (giangVien && !isValidObjectId(giangVien)) {
      return res.status(400).json({ message: "ID giảng viên không hợp lệ" });
    }

    if (giangVien) {
      const lecturer = await User.findById(giangVien);
      if (!lecturer || lecturer.role !== "lecturer") {
        return res.status(400).json({ message: "Giảng viên không tồn tại hoặc sai role" });
      }
    }

    const section = await Section.create({
      maLop,
      tenLop,
      monHoc,
      giangVien: giangVien || null,
      lichHoc: lichHoc || "",
    });

    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("monHoc", "maMon tenMon soTinChi")
      .populate("giangVien", "fullName username")
      .populate("sinhVien", "fullName username");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("monHoc", "maMon tenMon soTinChi")
      .populate("giangVien", "fullName username")
      .populate("sinhVien", "fullName username");
    if (!section) return res.status(404).json({ message: "Không tìm thấy lớp học phần" });
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { tenLop, monHoc, giangVien, lichHoc } = req.body;
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Không tìm thấy lớp học phần" });

    if (tenLop !== undefined) section.tenLop = tenLop;
    if (monHoc) {
      if (!isValidObjectId(monHoc)) {
        return res.status(400).json({ message: "ID môn học không hợp lệ" });
      }
      const course = await Course.findById(monHoc);
      if (!course) return res.status(404).json({ message: "Môn học không tồn tại" });
      section.monHoc = monHoc;
    }
    if (giangVien) {
      if (!isValidObjectId(giangVien)) {
        return res.status(400).json({ message: "ID giảng viên không hợp lệ" });
      }
      const lecturer = await User.findById(giangVien);
      if (!lecturer || lecturer.role !== "lecturer") {
        return res.status(400).json({ message: "Giảng viên không tồn tại hoặc sai role" });
      }
      section.giangVien = giangVien;
    }
    if (lichHoc !== undefined) section.lichHoc = lichHoc;

    await section.save();
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Không tìm thấy lớp học phần" });

    await section.deleteOne();
    res.json({ message: "Đã xóa lớp học phần" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
