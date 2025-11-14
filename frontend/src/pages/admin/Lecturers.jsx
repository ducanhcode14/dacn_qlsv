// frontend/src/pages/admin/Lecturers.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";

export default function Lecturers() {
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    lecturerCode: "",
    department: "",
    email: "",
  });

  const loadLecturers = () => {
    api
      .get("/lecturers")
      .then((res) => setLecturers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadLecturers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/lecturers/create", form);
      alert("Tạo giảng viên thành công");
      setForm({
        fullName: "",
        username: "",
        password: "",
        lecturerCode: "",
        department: "",
        email: "",
      });
      loadLecturers();
    } catch (err) {
      alert(err.response?.data?.message || "Tạo giảng viên thất bại");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <h2>👨‍🏫 Quản lý giảng viên</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: 20, marginBottom: 20 }}>
          <div>
            <label>Họ tên</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên đăng nhập</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mã giảng viên</label>
            <input
              name="lecturerCode"
              value={form.lecturerCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bộ môn / Khoa</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-login" style={{ marginTop: 10 }}>
            Tạo giảng viên
          </button>
        </form>

        <h3>Danh sách giảng viên</h3>
        <table>
          <thead>
            <tr>
              <th>Mã GV</th>
              <th>Họ tên</th>
              <th>Tên đăng nhập</th>
              <th>Khoa</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((l) => (
              <tr key={l._id}>
                <td>{l.lecturerCode}</td>
                <td>{l.userId?.fullName}</td>
                <td>{l.userId?.username}</td>
                <td>{l.department}</td>
                <td>{l.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
