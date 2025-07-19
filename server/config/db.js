import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB Connected"));

    await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (e) {
    console.log(e.message);
  }
};
