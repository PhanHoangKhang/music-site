import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("Failed !!!", error);
    process.exit(1);
  }
}

export default connect