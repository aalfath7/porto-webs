import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/portfolio_app"
    );
    console.log("MongoDB Connected");
  }
};
