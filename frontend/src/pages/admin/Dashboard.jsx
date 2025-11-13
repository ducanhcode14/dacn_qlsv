import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import api from "../../api/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    studentCount: 0,
    lecturerCount: 0,
    courseCount: 0,
    sectionCount: 0,
  });

  useEffect(() => {
    api.get("/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Lỗi load thống kê:", err));
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <div className="dashboard-content">
          <h2>👋 Chào mừng bạn đến trang quản trị</h2>
          <p>Tại đây bạn có thể quản lý người dùng, giảng viên, môn học và điểm số.</p>

          <div className="dashboard-stats">
            <div className="stat-box blue">
              <h3>{stats.studentCount}</h3>
              <p>Sinh viên</p>
            </div>
            <div className="stat-box green">
              <h3>{stats.lecturerCount}</h3>
              <p>Giảng viên</p>
            </div>
            <div className="stat-box yellow">
              <h3>{stats.courseCount}</h3>
              <p>Môn học</p>
            </div>
            <div className="stat-box purple">
              <h3>{stats.sectionCount}</h3>
              <p>Lớp học phần</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
