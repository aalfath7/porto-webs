import { defineEventHandler, createError, getRouterParam } from "h3";
import { connectDB } from "~/server/database";
import mongoose from "mongoose";

// Definisikan kembali schema dan model jika belum ada
const ItemSchema = new mongoose.Schema({
  title: String,
  link: String,
  desc: String,
  tags: [String],
  image: String,
  color: String,
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default defineEventHandler(async (event) => {
  await connectDB();

  const id = getRouterParam(event, "id");

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid ID",
    });
  }

  const item = await Item.findById(id);

  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: "Item not found",
    });
  }

  return {
    message: "Item retrieved successfully",
    item,
  };
});
