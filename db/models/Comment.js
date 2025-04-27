import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Important: Check for existing model first
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export { Comment };
