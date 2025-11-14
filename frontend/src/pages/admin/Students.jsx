// frontend/src/pages/admin/Students.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    studentCode: "",
    className: "",
    major: "",
    email: "",
  });

  const loadStudents = () => {
    api
      .get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/students", form);
      alert("Tạo sinh viên thành công");
      setForm({
        fullName: "",
        username: "",
        password: "",
        studentCode: "",
        className: "",
        major: "",
        email: "",
      });
      loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Tạo sinh viên thất bại");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <h2>🎓 Quản lý sinh viên</h2>

        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
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
            <label>Mã sinh viên</label>
            <input
              name="studentCode"
              value={form.studentCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Lớp</label>
            <input
              name="className"
              value={form.className}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ngành</label>
            <input
              name="major"
              value={form.major}
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
            Tạo sinh viên
          </button>
        </form>

        <h3>Danh sách sinh viên</h3>
        <table>
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Tên đăng nhập</th>
              <th>Lớp</th>
              <th>Ngành</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.studentCode}</td>
                <td>{s.userId?.fullName}</td>
                <td>{s.userId?.username}</td>
                <td>{s.className}</td>
                <td>{s.major}</td>
                <td>{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
