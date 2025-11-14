// frontend/src/pages/admin/Courses.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    maMon: "",
    tenMon: "",
    soTinChi: 3,
    moTa: "",
  });

  const loadCourses = () => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, form);
      } else {
        await api.post("/courses", form);
      }
      setForm({ maMon: "", tenMon: "", soTinChi: 3, moTa: "" });
      setEditingId(null);
      loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Lưu môn học thất bại");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      maMon: course.maMon,
      tenMon: course.tenMon,
      soTinChi: course.soTinChi,
      moTa: course.moTa || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa môn học này?")) return;
    try {
      await api.delete(`/courses/${id}`);
      loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Xóa thất bại");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <h2>📚 Quản lý môn học</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: 20, marginBottom: 20 }}>
          <div>
            <label>Mã môn</label>
            <input
              name="maMon"
              value={form.maMon}
              disabled={!!editingId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên môn</label>
            <input
              name="tenMon"
              value={form.tenMon}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Số tín chỉ</label>
            <input
              type="number"
              name="soTinChi"
              value={form.soTinChi}
              onChange={handleChange}
              min={1}
            />
          </div>
          <div>
            <label>Mô tả</label>
            <textarea
              name="moTa"
              value={form.moTa}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <button type="submit" className="btn-login" style={{ marginTop: 10 }}>
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Mã môn</th>
              <th>Tên môn</th>
              <th>Tín chỉ</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id}>
                <td>{c.maMon}</td>
                <td>{c.tenMon}</td>
                <td>{c.soTinChi}</td>
                <td>{c.moTa}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Sửa</button>{" "}
                  <button onClick={() => handleDelete(c._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
