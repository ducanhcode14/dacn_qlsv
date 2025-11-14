// backend/src/models/Enrollment.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    status: {
      type: String,
      enum: ["enrolled", "cancelled"],
      default: "enrolled",
    },
  },
  { timestamps: true }
);

// 1 sinh viên chỉ được đăng ký 1 lần 1 lớp học phần
enrollmentSchema.index({ student: 1, section: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
