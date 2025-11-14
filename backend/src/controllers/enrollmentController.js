// backend/src/controllers/enrollmentController.js
import Enrollment from "../models/Enrollment.js";
import Section from "../models/Section.js";
import { isValidObjectId } from "../utils/validate.js";

export const enrollSection = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { sectionId } = req.body;

    if (!isValidObjectId(sectionId)) {
      return res.status(400).json({ message: "ID lớp học phần không hợp lệ" });
    }

    const section = await Section.findById(sectionId).populate("monHoc");
    if (!section) return res.status(404).json({ message: "Không tìm thấy lớp học phần" });

    const enrollment = await Enrollment.create({
      student: studentId,
      section: sectionId,
    });

    // Thêm vào danh sách sinhVien của Section (nếu chưa có)
    if (!section.sinhVien.includes(studentId)) {
      section.sinhVien.push(studentId);
      await section.save();
    }

    res.status(201).json({
      message: "Đăng ký học phần thành công",
      enrollment,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Bạn đã đăng ký lớp này rồi" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const cancelEnrollment = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: studentId,
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Không tìm thấy đăng ký học phần" });
    }

    enrollment.status = "cancelled";
    await enrollment.save();

    // Gỡ khỏi Section.sinhVien
    const section = await Section.findById(enrollment.section);
    if (section) {
      section.sinhVien = section.sinhVien.filter(
        (sv) => sv.toString() !== studentId.toString()
      );
      await section.save();
    }

    res.json({ message: "Hủy đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user._id;
    const enrollments = await Enrollment.find({
      student: studentId,
      status: "enrolled",
    })
      .populate({
        path: "section",
        populate: [
          { path: "monHoc", select: "maMon tenMon soTinChi" },
          { path: "giangVien", select: "fullName username" },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
