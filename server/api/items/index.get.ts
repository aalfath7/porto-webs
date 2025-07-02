import { Item } from "~/server/models/Item";
import { connectDB } from "~/server/database";

export default defineEventHandler(async () => {
  await connectDB();
  const items = await Item.find().sort({ createdAt: -1 });
  return items;
});
