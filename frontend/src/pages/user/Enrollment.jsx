// frontend/src/pages/user/Enrollment.jsx
import React, { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import api from "../../api/api";
import "./Profile.css"; // dùng chung style table/layout

export default function Enrollment() {
  const [sections, setSections] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);

  const load = () => {
    api.get("/sections").then((res) => setSections(res.data));
    api.get("/enrollments/me").then((res) => setMyEnrollments(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEnroll = async (sectionId) => {
    try {
      await api.post("/enrollments", { sectionId });
      alert("Đăng ký thành công");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  const handleCancel = async (enrollmentId) => {
    if (!window.confirm("Hủy đăng ký lớp này?")) return;
    try {
      await api.delete(`/enrollments/${enrollmentId}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Hủy đăng ký thất bại");
    }
  };

  const enrolledSectionIds = myEnrollments
    .filter((e) => e.status === "enrolled")
    .map((e) => e.section?._id);

  return (
    <div className="stu-layout">
      <StudentSidebar />
      <StudentHeader />
      <main className="stu-main">
        <div className="stu-main-inner">
          <section className="stu-card">
            <h2>Đăng ký học phần</h2>
            <table className="stu-table">
              <thead>
                <tr>
                  <th>Mã lớp</th>
                  <th>Tên lớp</th>
                  <th>Môn học</th>
                  <th>Giảng viên</th>
                  <th>Lịch học</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sections.map((s) => {
                  const enrolled = enrolledSectionIds.includes(s._id);
                  return (
                    <tr key={s._id}>
                      <td>{s.maLop}</td>
                      <td>{s.tenLop}</td>
                      <td>{s.monHoc?.tenMon}</td>
                      <td>{s.giangVien?.fullName}</td>
                      <td>{s.lichHoc}</td>
                      <td>
                        <button
                          disabled={enrolled}
                          onClick={() => handleEnroll(s._id)}
                        >
                          {enrolled ? "Đã đăng ký" : "Đăng ký"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="stu-card">
            <h3>Học phần đã đăng ký</h3>
            <table className="stu-table">
              <thead>
                <tr>
                  <th>Mã lớp</th>
                  <th>Môn học</th>
                  <th>Giảng viên</th>
                  <th>Lịch học</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myEnrollments.map((e) => (
                  <tr key={e._id}>
                    <td>{e.section?.maLop}</td>
                    <td>{e.section?.monHoc?.tenMon}</td>
                    <td>{e.section?.giangVien?.fullName}</td>
                    <td>{e.section?.lichHoc}</td>
                    <td>
                      {e.status === "enrolled" && (
                        <button onClick={() => handleCancel(e._id)}>
                          Hủy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
