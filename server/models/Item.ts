import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: String,
  link: String,
  image: String,
});

export const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
