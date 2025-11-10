import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menu = [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },
    { label: "Giảng viên", path: "/admin/lecturers" },
    { label: "Môn học", path: "/admin/courses" },
    { label: "Lớp học phần", path: "/admin/sections" },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Quản trị</h2>
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li
            key={item.path}
            className={currentPath === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
