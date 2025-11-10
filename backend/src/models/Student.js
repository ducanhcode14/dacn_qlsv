import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentCode: { type: String, required: true, unique: true },
  className: { type: String },
  major: { type: String },
  email: { type: String }
});

export default mongoose.model("Student", studentSchema);
