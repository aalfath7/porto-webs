import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: String,
  link: String,
  desc: String,
  tags: [String],
  image: String,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
