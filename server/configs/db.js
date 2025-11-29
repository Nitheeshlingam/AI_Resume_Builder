import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) throw new Error("MONGODB_URI not set");

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);
    console.log("MongoDB Connected ✔️");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

export default connectDB;
