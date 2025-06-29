import { defineEventHandler, createError } from "h3";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "~/server/database";

// Schema
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

  const uploadPath = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const form = formidable({
    uploadDir: uploadPath,
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

  const imageFile: any = Array.isArray(files.image)
    ? files.image[0]
    : files.image;

  if (!imageFile || !imageFile.newFilename) {
    throw createError({ statusCode: 400, statusMessage: "Image is required" });
  }

  // Optional: cek mimetype
  if (!imageFile.mimetype?.startsWith("image/")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Only image uploads allowed",
    });
  }

  const imagePath = `/uploads/${imageFile.newFilename}`;

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
