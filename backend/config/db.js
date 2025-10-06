import mongoose from "mongoose";

export default connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB connected"));
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err.message);
  }
};
