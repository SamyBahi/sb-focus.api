import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    myDay: {
      type: Boolean,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    listId: {
      type: mongoose.Types.ObjectId,
      ref: "List",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    steps: {
      type: [String],
    },
    dueDate: {
      type: Date,
    },
    files: {
      type: [String],
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
