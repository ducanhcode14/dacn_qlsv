// backend/src/models/Section.js
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    maLop: { type: String, required: true, unique: true }, // Mã lớp học phần (ví dụ: LHP001)
    tenLop: { type: String, required: true },              // Tên lớp học phần
    monHoc: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Môn học liên kết
    giangVien: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Giảng viên phụ trách
    sinhVien: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách sinh viên trong lớp
    lichHoc: { type: String },                             // Ví dụ: "Thứ 2, 4, 6 (7h30 - 9h)"
  },
  { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);
