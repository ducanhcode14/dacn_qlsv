// backend/src/controllers/studentController.js
import User from "../models/User.js";
import Student from "../models/Student.js";

// Admin tạo sinh viên (user + student profile)
export const createStudent = async (req, res) => {
  try {
    const { username, password, fullName, studentCode, className, major, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    const existingStudent = await Student.findOne({ studentCode });
    if (existingStudent) {
      return res.status(400).json({ message: "Mã sinh viên đã tồn tại" });
    }

    const user = await User.create({
      username,
      password,
      fullName,
      role: "student",
    });

    const student = await Student.create({
      userId: user._id,
      studentCode,
      className,
      major,
      email,
    });

    res.status(201).json({
      message: "Tạo sinh viên thành công",
      user: { id: user._id, username: user.username, role: user.role },
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Danh sách sinh viên (admin)
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userId", "fullName username role")
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thông tin sinh viên hiện tại (role = student)
export const getMyStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const student = await Student.findOne({ userId }).populate(
      "userId",
      "fullName username role"
    );
    if (!student) return res.status(404).json({ message: "Không tìm thấy hồ sơ sinh viên" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
