// frontend/src/pages/admin/Sections.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";

export default function Sections() {
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState({
    maLop: "",
    tenLop: "",
    monHoc: "",
    giangVien: "",
    lichHoc: "",
  });

  const loadData = () => {
    api.get("/sections").then((res) => setSections(res.data));
    api.get("/courses").then((res) => setCourses(res.data));
    api.get("/lecturers").then((res) => setLecturers(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sections", form);
      setForm({ maLop: "", tenLop: "", monHoc: "", giangVien: "", lichHoc: "" });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Tạo lớp học phần thất bại");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <h2>🏫 Quản lý lớp học phần</h2>

        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
          <div>
            <label>Mã lớp</label>
            <input
              name="maLop"
              value={form.maLop}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên lớp</label>
            <input
              name="tenLop"
              value={form.tenLop}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Môn học</label>
            <select
              name="monHoc"
              value={form.monHoc}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn môn --</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.maMon} - {c.tenMon}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Giảng viên</label>
            <select
              name="giangVien"
              value={form.giangVien}
              onChange={handleChange}
            >
              <option value="">-- Chọn giảng viên --</option>
              {lecturers.map((l) => (
                <option key={l._id} value={l.userId?._id}>
                  {l.userId?.fullName} ({l.lecturerCode})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Lịch học</label>
            <input
              name="lichHoc"
              value={form.lichHoc}
              onChange={handleChange}
              placeholder="VD: Thứ 2,4,6 (7h30 - 9h)"
            />
          </div>
          <button type="submit" className="btn-login" style={{ marginTop: 10 }}>
            Tạo lớp học phần
          </button>
        </form>

        <h3>Danh sách lớp học phần</h3>
        <table>
          <thead>
            <tr>
              <th>Mã lớp</th>
              <th>Tên lớp</th>
              <th>Môn học</th>
              <th>Giảng viên</th>
              <th>Lịch học</th>
              <th>Số SV</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <tr key={s._id}>
                <td>{s.maLop}</td>
                <td>{s.tenLop}</td>
                <td>{s.monHoc?.tenMon}</td>
                <td>{s.giangVien?.fullName}</td>
                <td>{s.lichHoc}</td>
                <td>{s.sinhVien?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
