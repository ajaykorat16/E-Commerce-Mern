import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${connection.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`error in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDb;
