import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lecturerCode: { type: String, required: true, unique: true },
  department: { type: String },
  email: { type: String }
});

export default mongoose.model("Lecturer", lecturerSchema);
