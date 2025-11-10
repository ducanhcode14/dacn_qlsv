import React from "react";
import "./Header.css";

export default function Header() {
  const username = localStorage.getItem("username") || "Admin";

  return (
    <header className="header">
      <h1 className="header-title">Hệ thống quản lý sinh viên</h1>
      <div className="header-user">
        <span className="header-name">{username}</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avatar"
          className="header-avatar"
        />
      </div>
    </header>
  );
}
