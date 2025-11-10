import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./StudentSidebar.css";

export default function StudentSidebar() {
  const location = useLocation();
  const current = location.pathname;

  const menu = [
    { path: "/user/profile", label: "Hồ sơ cá nhân" },
    { path: "/user/enrollment", label: "Đăng ký học phần" },
    { path: "/user/scores", label: "Kết quả học tập" },
    { path: "/user/schedule", label: "Lịch học" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="stu-sidebar">
      <div className="stu-sidebar-top">
        <h2 className="stu-logo">Sinh viên</h2>
        <ul className="stu-menu">
          {menu.map((item) => (
            <li
              key={item.path}
              className={current === item.path ? "active" : ""}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="stu-sidebar-bottom">
        <button className="stu-logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
