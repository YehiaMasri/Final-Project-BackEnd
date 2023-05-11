import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);

dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, { useUnifiedTopology: true })
      .then(() => {
        console.log(`connected to database`);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDataBase;