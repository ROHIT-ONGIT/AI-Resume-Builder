import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = process.env.MONGODB_DB || "resume-builder";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    mongodbURI = mongodbURI.replace(/\/+$/, "");

    // detect if URI already contains a DB name
    const hasDb = /\/[^\/\?]+(\?|$)/.test(mongodbURI);
    const connectString = hasDb ? mongodbURI : `${mongodbURI}/${projectName}`;


    
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    
    console.log("MongoDB connected successfully");

    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error (event):", err);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
    // rethrow so caller (server startup) can decide to stop
    throw err;
  }
};

export default connectDB;