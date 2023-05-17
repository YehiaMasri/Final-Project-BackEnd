import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "email not found" });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.status(200).json({ ...otherDetails, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json("User has been deleted.");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: "users Not Found" });
    }
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    let id = req.params.id;
    const user = await User.findById({ id });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      res.status(200).json({ success: true, user });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "User Updated Successfully" }, updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export function logout(req, res, next) {
  try {
    res.clearCookie("access_token");
    return res.status(200).send("logged out");
  } catch (err) {
    res.send(err.message);
  }
}

export const getBookedSections = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("bookedSections");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ bookedSections: user.bookedSections });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching booked sections", error });
  }
};
