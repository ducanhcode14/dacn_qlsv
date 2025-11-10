// src/pages/auth/Register.jsx
import React, { useState } from "react";
import api from "../../api/api";
import "./Login.css"; // tái sử dụng style của trang login để đồng bộ giao diện

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      // Chỉ gửi fullName, username, password. Role sẽ mặc định là "student" ở backend.
      await api.post("/auth/register", {
        fullName: form.fullName,
        username: form.username,
        password: form.password,
      });

      alert("Đăng ký thành công! Hãy đăng nhập.");
      window.location.href = "/login";
    } catch (err) {
      alert(err?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Tạo tài khoản Sinh viên</h2>
        <p className="login-subtitle">Điền thông tin bên dưới để đăng ký</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              name="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              name="username"
              type="text"
              placeholder="sv001"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              name="password"
              type="password"
              placeholder="••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nhập lại mật khẩu</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">Đăng ký</button>
        </form>

        <div className="login-footer">
          <p>
            Đã có tài khoản?{" "}
            <a href="/login" className="link-register">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}
