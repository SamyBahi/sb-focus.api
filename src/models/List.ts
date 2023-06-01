import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
    },
  },
  { timestamps: true }
);

export default mongoose.model("List", listSchema);
