import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists",
      });
    }

    // check the password
    const isMatchPass = await bcrypt.compare(password, user.password);

    if (isMatchPass) {
      const token = createToken(user._id);
      res.json({
        success: true,
        userName: user.name,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Creadentials",
      });
    }
  } catch (error) {
    console.log("Log IN ERRor", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validation email format and strong pass
    if (!validator.isEmail(email)) {
      return res.json({
        sussess: false,
        message: "Please enter a valid email",
      });
    }

    // validatin of strong pass
    if (password.length < 8) {
      return res.json({
        sussess: false,
        message: "Please enter a strong password",
      });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // gen new user
    const newUser = new userModel({
      name,
      email,
      password: hashPass,
    });
    const user = await newUser.save();

    // gen token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: flase,
      message: error.message,
    });
  }
};

const registerSeller = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validation email format and strong pass
    if (!validator.isEmail(email)) {
      return res.json({
        sussess: false,
        message: "Please enter a valid email",
      });
    }

    // validatin of strong pass
    if (password.length < 8) {
      return res.json({
        sussess: false,
        message: "Please enter a strong password",
      });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // gen new user
    const newUser = new userModel({
      name,
      email,
      password: hashPass,
      isBuyer:false
    });
    const user = await newUser.save();

    // gen token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: flase,
      message: error.message,
    });
  }
};

const logInAdmin = async (req, res) => {};

const isTokenCoreect = async (req, res) => {};

export { logInUser, registerUser, registerSeller, logInAdmin, isTokenCoreect };
