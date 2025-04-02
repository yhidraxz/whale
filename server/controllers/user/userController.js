import { User } from "../../models/schemas/userSchema.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  let emailExists = await User.findOne({
    email: req.body.email,
  }).exec();

  let usernameExists = await User.findOne({
    username: req.body.username,
  }).exec();

  if (emailExists) {
    res.status(400).json({
      message: "a user with this email already exists, please try logging in",
    });
  } else if (usernameExists) {
    res.status(400).json({
      message: "this username is already taken, please try another one",
    });
  } else if (!usernameExists && !emailExists) {
    password = await bcrypt.hash(password, 10);

    let newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json("user created");
  }
};

// const logUser = async(req, res) => {

//}

export { createUser };
