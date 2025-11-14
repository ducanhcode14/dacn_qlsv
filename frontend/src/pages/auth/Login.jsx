// frontend/src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // mapping role → router path
  const roleToPath = {
    admin: "/admin/dashboard",
    student: "/user/profile",
    user: "/user/profile",
    lecturer: "/lecturer/dashboard",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { username, password });

      if (!res.data?.token || !res.data?.user) {
        alert("Phản hồi từ server không hợp lệ");
        return;
      }

      const { token, user } = res.data;

      // Lưu thông tin người dùng
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id); // ⭐ QUAN TRỌNG — BẠN CẦN CÁI NÀY

      // Điều hướng theo role
      const redirectPath = roleToPath[user.role] || "/login";
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Hệ thống Quản lý Sinh viên</h2>
        <p className="login-subtitle">Vui lòng đăng nhập để tiếp tục</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">Đăng nhập</button>
        </form>

        <div className="login-footer">
          <p>
            Chưa có tài khoản?{" "}
            <a href="/register" className="link-register">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
