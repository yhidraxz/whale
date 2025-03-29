import mongoose from "mongoose";

mongoose.set("strictQuery", false);

let MONGO_URL =
  "mongodb+srv://gustavonasc58:H2n3fYDuMXUx84yJ@whale.lp16cot.mongodb.net/?retryWrites=true&w=majority&appName=Whale";

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected this shit");
  } catch {
    console.log("cant connecvt this shit bro");
    process.exit(1);
  }
};
