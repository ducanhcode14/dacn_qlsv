// backend/src/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    maMon: { type: String, required: true, unique: true },
    tenMon: { type: String, required: true },
    soTinChi: { type: Number, required: true },
    moTa: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
