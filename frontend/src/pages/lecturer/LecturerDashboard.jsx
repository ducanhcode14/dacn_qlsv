// frontend/src/pages/lecturer/LecturerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function LecturerDashboard() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api
      .get("/sections")
      .then((res) => {
        // lọc các lớp mà giảng viên hiện tại phụ trách
        const userId = localStorage.getItem("userId");
        const filtered = res.data.filter(
          (s) => s.giangVien && s.giangVien._id === userId
        );
        setSections(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Trang giảng viên</h2>
      <p>Các lớp bạn đang phụ trách:</p>
      <table>
        <thead>
          <tr>
            <th>Mã lớp</th>
            <th>Tên lớp</th>
            <th>Môn học</th>
            <th>Số SV</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => (
            <tr key={s._id}>
              <td>{s.maLop}</td>
              <td>{s.tenLop}</td>
              <td>{s.monHoc?.tenMon}</td>
              <td>{s.sinhVien?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
