// backend/src/utils/validate.js
import mongoose from "mongoose";

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
