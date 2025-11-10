import React, { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // TODO: sau này thay bằng API thật: api.get("/users/me")
    const mockUser = {
      fullName: "Nguyễn Văn A",
      studentId: "SV1150080126",
      className: "11_ĐH_THMT",
      email: "nguyenvana@stu.edu.vn",
      major: "Công nghệ thông tin",
    };

    const mockCourses = [
      { code: "CT101", name: "Cơ sở lập trình", credit: 3, score: 8.5 },
      { code: "CT202", name: "Cấu trúc dữ liệu & Giải thuật", credit: 3, score: 9.0 },
      { code: "CT305", name: "Cơ sở dữ liệu", credit: 3, score: 8.0 },
    ];

    setUser(mockUser);
    setCourses(mockCourses);

    // lưu tạm lên localStorage để header dùng
    localStorage.setItem("fullName", mockUser.fullName);
    localStorage.setItem("studentId", mockUser.studentId);
  }, []);

  return (
    <div className="stu-layout">
      <StudentSidebar />
      <StudentHeader />

      <main className="stu-main">
        <div className="stu-main-inner">
          {/* Khối thông tin chung */}
          <section className="stu-card stu-card-info">
            <h2>Thông tin cá nhân</h2>
            <div className="stu-info-grid">
              <div>
                <span>Họ và tên</span>
                <p>{user.fullName}</p>
              </div>
              <div>
                <span>Mã sinh viên</span>
                <p>{user.studentId}</p>
              </div>
              <div>
                <span>Lớp</span>
                <p>{user.className}</p>
              </div>
              <div>
                <span>Ngành</span>
                <p>{user.major}</p>
              </div>
              <div>
                <span>Email</span>
                <p>{user.email}</p>
              </div>
            </div>
          </section>

          {/* Khối học phần & tổng quan */}
          <section className="stu-grid-2">
            <div className="stu-card">
              <h3>Học phần đã đăng ký</h3>
              <table className="stu-table">
                <thead>
                  <tr>
                    <th>Mã HP</th>
                    <th>Tên học phần</th>
                    <th>Tín chỉ</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.code}>
                      <td>{c.code}</td>
                      <td className="text-left">{c.name}</td>
                      <td>{c.credit}</td>
                      <td className="score">{c.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stu-card stu-summary">
              <h3>Tổng quan học tập</h3>
              <div className="stu-summary-item">
                <span>Tổng số tín chỉ</span>
                <strong>
                  {courses.reduce((sum, c) => sum + c.credit, 0)}
                </strong>
              </div>
              <div className="stu-summary-item">
                <span>Số học phần</span>
                <strong>{courses.length}</strong>
              </div>
              <div className="stu-summary-item">
                <span>Điểm TB (ước tính)</span>
                <strong>
                  {(
                    courses.reduce((sum, c) => sum + c.score, 0) /
                    (courses.length || 1)
                  ).toFixed(2)}
                </strong>
              </div>
              <p className="stu-summary-note">
                *Dữ liệu minh họa, sau này thay bằng dữ liệu thật từ hệ thống.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
