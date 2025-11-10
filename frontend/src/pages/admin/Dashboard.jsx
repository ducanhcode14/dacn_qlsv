import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="admin-container">
      <Sidebar />
      <Header />
      <main className="admin-main">
        <div className="dashboard-content">
          <h2>👋 Chào mừng bạn đến trang quản trị</h2>
          <p>
            Tại đây bạn có thể quản lý người dùng, giảng viên, môn học và điểm số.
          </p>

          <div className="dashboard-stats">
            <div className="stat-box blue">
              <h3>120</h3>
              <p>Sinh viên</p>
            </div>
            <div className="stat-box green">
              <h3>15</h3>
              <p>Giảng viên</p>
            </div>
            <div className="stat-box yellow">
              <h3>28</h3>
              <p>Môn học</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
