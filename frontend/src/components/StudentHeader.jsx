import React from "react";
import "./StudentHeader.css";

export default function StudentHeader() {
  const fullName = localStorage.getItem("fullName") || "Sinh viên";
  const studentId = localStorage.getItem("studentId") || "Mã SV";

  return (
    <header className="stu-header">
      <div>
        <h1 className="stu-header-title">Trang sinh viên</h1>
        <p className="stu-header-sub">Hệ thống quản lý sinh viên & học phần</p>
      </div>

      <div className="stu-header-user">
        <div className="stu-header-info">
          <div className="stu-header-name">{fullName}</div>
          <div className="stu-header-id">{studentId}</div>
        </div>
        <div className="stu-header-avatar">
          {fullName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
