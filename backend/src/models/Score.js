// backend/src/models/Score.js
import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },

    diemQT: { type: Number, min: 0, max: 10, default: 0 },  // điểm quá trình
    diemThi: { type: Number, min: 0, max: 10, default: 0 }, // điểm thi
    diemTK: { type: Number, min: 0, max: 10, default: 0 },  // điểm tổng kết
  },
  { timestamps: true }
);

scoreSchema.pre("save", function (next) {
  // Công thức ví dụ: TK = 0.4 * QT + 0.6 * Thi
  this.diemTK = +(0.4 * this.diemQT + 0.6 * this.diemThi).toFixed(2);
  next();
});

scoreSchema.index({ student: 1, course: 1, section: 1 }, { unique: true });

export default mongoose.model("Score", scoreSchema);
