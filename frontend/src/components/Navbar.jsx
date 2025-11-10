import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>Trang Quản Trị</h3>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
