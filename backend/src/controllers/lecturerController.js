import User from "../models/User.js";
import Lecturer from "../models/Lecturer.js";

// Admin tạo tài khoản giảng viên
export const createLecturerAccount = async (req, res) => {
  try {
    const { username, password, fullName, lecturerCode, department, email } = req.body;

    // Kiểm tra tài khoản đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    // Tạo tài khoản User (role = lecturer)
    const user = await User.create({
      username,
      password,
      fullName,
      role: "lecturer"
    });

    // Tạo thông tin giảng viên
    const lecturer = await Lecturer.create({
      userId: user._id,
      lecturerCode,
      department,
      email
    });

    res.status(201).json({
      message: "Tạo tài khoản giảng viên thành công",
      user: { id: user._id, username: user.username, role: user.role },
      lecturer
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo tài khoản giảng viên" });
  }
};
