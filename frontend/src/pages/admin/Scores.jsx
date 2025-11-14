// frontend/src/pages/admin/Scores.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    api
      .get("/scores/all")
      .then((res) => setScores(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <h2>📊 Bảng điểm</h2>
        <table>
          <thead>
            <tr>
              <th>Sinh viên</th>
              <th>Môn học</th>
              <th>Lớp HP</th>
              <th>Điểm QT</th>
              <th>Điểm thi</th>
              <th>Điểm TK</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s._id}>
                <td>{s.student?.fullName}</td>
                <td>{s.course?.tenMon}</td>
                <td>{s.section?.maLop}</td>
                <td>{s.diemQT}</td>
                <td>{s.diemThi}</td>
                <td>{s.diemTK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
