import mongoose from "mongoose";

export const dbconnection = async () => {
  try {
    const dbconnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected ${dbconnection.connection.host}`);
  } catch (error) {
    console.log("mongodb connection error0", error);
  }
};
