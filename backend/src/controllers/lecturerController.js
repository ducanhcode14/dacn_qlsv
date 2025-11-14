// backend/src/controllers/lecturerController.js
import User from "../models/User.js";
import Lecturer from "../models/Lecturer.js";

// Admin tạo tài khoản giảng viên (bạn đã có, tớ giữ nguyên + format)
export const createLecturerAccount = async (req, res) => {
  try {
    const { username, password, fullName, lecturerCode, department, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    const existingLecturer = await Lecturer.findOne({ lecturerCode });
    if (existingLecturer) {
      return res.status(400).json({ message: "Mã giảng viên đã tồn tại" });
    }

    const user = await User.create({
      username,
      password,
      fullName,
      role: "lecturer",
    });

    const lecturer = await Lecturer.create({
      userId: user._id,
      lecturerCode,
      department,
      email,
    });

    res.status(201).json({
      message: "Tạo tài khoản giảng viên thành công",
      user: { id: user._id, username: user.username, role: user.role },
      lecturer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo tài khoản giảng viên" });
  }
};

// Lấy danh sách giảng viên (admin)
export const getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find()
      .populate("userId", "fullName username role")
      .sort({ createdAt: -1 });

    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
