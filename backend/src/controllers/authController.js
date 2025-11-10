// backend/src/controllers/authController.js
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

// Đăng ký: chỉ cho sinh viên tự đăng ký
export const register = async (req, res) => {
  try {
    const { username, password, fullName, role } = req.body;

    // Không cho người dùng tự set role khác student
    if (role && role !== "student") {
      return res.status(403).json({ message: "Chỉ sinh viên được phép tự đăng ký!" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    const user = await User.create({
      username,
      password,
      fullName,
      role: "student", // Ép mặc định
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập (bạn đã có)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const token = generateToken(user);
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
