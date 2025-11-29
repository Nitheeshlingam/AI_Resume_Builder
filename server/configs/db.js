import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) throw new Error("MONGODB_URI not set");

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    const db = await mongoose.connect(`${mongodbURI}/${projectName}`);
    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB Connected ✔️");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

export default connectDB;
