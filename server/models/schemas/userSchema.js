import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

export { User };
