import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error("Mongo URI not defined")
    }

    await mongoose.connect(uri)

    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
export default connectDB