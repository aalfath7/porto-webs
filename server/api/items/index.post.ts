import { defineEventHandler } from "h3";
import formidable from "formidable";
import fs from "fs";
import { connectDB } from "~/server/database";
import mongoose from "mongoose";

// Definisikan ulang schema dan model
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

  const form = formidable({
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  const { fields, files } = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const title = fields.title?.toString() || "";
  const link = fields.link?.toString() || "";
  const desc = fields.desc?.toString() || "";
  const color = fields.color?.toString() || "";
  let tags: string[] = [];

  const rawTags = fields.tags as string | string[] | undefined;

  if (rawTags) {
    if (Array.isArray(rawTags)) {
      tags = rawTags.map((t) => String(t).trim());
    } else {
      tags = rawTags.split(",").map((t) => t.trim());
    }
  }

  // Ambil gambar
  const imageFile: any = Array.isArray(files.image)
    ? files.image[0]
    : files.image;
  const imagePath = `/uploads/${imageFile.newFilename}`;

  // Simpan ke DB
  const newItem = new Item({
    title,
    link,
    desc,
    tags,
    image: imagePath,
    color,
  });
  await newItem.save();

  return {
    message: "Item created successfully",
    item: newItem,
  };
});
