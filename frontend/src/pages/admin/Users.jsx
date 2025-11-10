import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/all")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Navbar />
        <div className="content-body">
          <h2>👥 Danh sách người dùng</h2>
          <table>
            <thead>
              <tr>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th>Họ tên</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
