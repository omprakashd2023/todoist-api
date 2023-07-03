const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    let user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    user = await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, ...user._doc });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const isMatch = await bcrpyt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, ...user._doc });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

const verifyController = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(401).json({
        message: "User not found, authorization denied!",
        authorized: false,
      });
    }
    res.status(200).json({ authorized: true, user: user._doc });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports = { signUpController, signInController, verifyController };
