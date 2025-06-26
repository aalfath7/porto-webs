import { defineEventHandler, readBody } from "h3";
import formidable from "formidable";
import { Item } from "~/server/models/Item";
import { connectDB } from "~/server/database";
import fs from "fs";

export default defineEventHandler(async (event) => {
  await connectDB();

  const form = formidable({
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  const data = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const title = data.fields.title?.toString() || "";
  const link = data.fields.link?.toString() || "";
  const imageFile: any = data.files.image?.[0] || data.files.image;

  const imagePath = `/uploads/${imageFile.newFilename}`;

  const newItem = new Item({ title, link, image: imagePath });
  await newItem.save();

  return { message: "Created", item: newItem };
});
