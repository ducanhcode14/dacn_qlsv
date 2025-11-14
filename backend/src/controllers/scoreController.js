// backend/src/controllers/scoreController.js
import Score from "../models/Score.js";

export const upsertScore = async (req, res) => {
  try {
    const { studentId, courseId, sectionId, diemQT, diemThi } = req.body;

    let score = await Score.findOne({ student: studentId, course: courseId, section: sectionId });

    if (!score) {
      score = await Score.create({
        student: studentId,
        course: courseId,
        section: sectionId,
        diemQT,
        diemThi,
      });
    } else {
      score.diemQT = diemQT;
      score.diemThi = diemThi;
      await score.save();
    }

    res.json({ message: "Lưu điểm thành công", score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy điểm của 1 sinh viên (admin hoặc chính sinh viên đó)
export const getScoresByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const requester = req.user;

    if (requester.role === "student" && requester._id.toString() !== studentId) {
      return res.status(403).json({ message: "Không có quyền xem điểm sinh viên khác" });
    }

    const scores = await Score.find({ student: studentId })
      .populate("course", "maMon tenMon soTinChi")
      .populate("section", "maLop tenLop");

    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin xem tất cả điểm
export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .populate("student", "fullName username")
      .populate("course", "maMon tenMon")
      .populate("section", "maLop tenLop");
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
