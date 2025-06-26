import { Item } from "~/server/models/Item";
import { connectDB } from "~/server/database";

export default defineEventHandler(async (event) => {
  await connectDB();
  const id = event.context.params?.id;
  await Item.findByIdAndDelete(id);
  return { message: "Deleted" };
});
