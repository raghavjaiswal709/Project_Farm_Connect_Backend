import { comparePassword, hashPassword } from "../helpers/authhelper.js";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, role, address } = req.body;

    if (!fname) {
      return res.send({ message: "First name is required" });
    }

    if (!lname) {
      return res.send({ message: "Last name is required" });
    }

    if (!email) {
      return res.send({ message: "Email name is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone number name is required" });
    }

    if (!password) {
      return res.send({ message: "Password name is required" });
    }

    if (!role) {
      return res.send({ message: "role is required" });
    }

    // checking existing user
    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new usermodel({
      fname,
      lname,
      email,
      phone,
      password: hashedPassword,
      role,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};

//login controler

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    //Token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login sucessfully",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//test controller

export const testController = (req, res, next) => {
  res.send("protected route");
};

//update profile

export const updateProfileController = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, role, address } = req.body;
    const user = await usermodel.findById(req.user._id);

    //checking for password
    if (!password && password.length < 6) {
      return res.json({
        error: "password is required and must have 6 characters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        fname: fname || user.fname,
        lname: lname || user.lname,
        email: email || user.email,
        phone: phone || user.phone,
        password: password || user.password,
        address: address || user.address,
        role: role || user.role,
      },
      {
        new: true,
      },
      res.status(200).send({
        success: true,
        message: "profile updated successfully",
        updateUser,
      })
    );
  } catch (error) {
    console.log(error);
    res.staus(400).send({
      message: "error in updating profile",
      success: false,
      error,
    });
  }
};
