const JWT = require("jsonwebtoken");
const { comparePassword, hash } = require("../helpers/Auth.js");
const Auth = require("../models/Auth.js");
const { createTransport } = require("nodemailer");
const OTP = require("../models/OTP.js");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "abydev2012@gmail.com",
    pass: "zuzo yeic eiwd euye",
  },
});

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, location, dob } = req.body;
    if (!name) return res.status(400).send({ message: "Name is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!phone) return res.status(400).send({ message: "Phone is required" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });
    if (!location)
      return res.status(400).send({ message: "Location is required" });
    if (!dob)
      return res.status(400).send({ message: "Date of Birth is required" });

    const existingUser = await Auth.findOne({ email });
    const existingUserByPhone = await Auth.findOne({ phone });

    if (existingUser || existingUserByPhone) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await hash(password);
    const newUser = new Auth({
      name,
      email,
      phone,
      password: hashedPassword,
      location,
      dob,
    });

    await newUser.save();
    return res.status(201).send({
      message: "User created successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      location: newUser.location,
      dob: newUser.dob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });

    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).send({ message: "User does not exist" });

    const actualPassword = await comparePassword(password, user?.password);
    if (!actualPassword)
      return res.status(400).send({ message: "Incorrect Password" });

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ message: "Logged in successfully", allInfo: user, token });
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, location, dob } = req.body;
    if (!name) return res.status(400).send({ message: "Name is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!phone) return res.status(400).send({ message: "Phone is required" });
    if (!location)
      return res.status(400).send({ message: "Location is required" });
    if (!dob)
      return res.status(400).send({ message: "Date of Birth is required" });

    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.uid,
      {
        name,
        email,
        phone,
        location,
        dob,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await Auth.findByIdAndDelete(req.params.uid);
    return res
      .status(200)
      .send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.sendOTPMail = async (req, res) => {
  try {
    const otp = `${Math.floor(10000 + Math.random() * 90000)}`;

    const mailOptions = {
      from: process.env.AUTH_USER,
      to: req.body.email,
      subject: "Verification code for changing password",
      html: `<h1 style='text-align:center;'>OTP for changing password</h1>
             <p>Enter the OTP on the website of <a href="https://www.omnishoesbd.com">Omni Shoes</a> to change your password:</p>
             <h1 style='text-align:center;'>${otp}</h1>`,
    };

    const hashedOTP = await hash(otp);

    const otpData = new OTP({
      userId: req.body.userId,
      otp: hashedOTP,
      expiresAt: new Date(Date.now() + 3600000),
    });

    await otpData.save();
    await transporter.sendMail(mailOptions);

    return res.status(200).send({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .send({ message: "Failed to send OTP", error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    if (!otp) return res.status(400).send({ message: "OTP is required" });
    if (!userId)
      return res.status(400).send({ message: "User ID is required" });

    const userOTP = await OTP.findOne({ userId });
    if (!userOTP) return res.status(404).send({ message: "OTP not valid" });

    const { expiresAt, otp: hashedOTP } = userOTP;
    if (expiresAt < Date.now()) {
      await OTP.deleteMany({ userId });
      return res.status(404).send({ message: "OTP expired" });
    }

    const validOTP = await comparePassword(otp, hashedOTP);
    if (!validOTP) return res.status(404).send({ message: "OTP not valid" });

    return res.status(200).send({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { password, _id } = req.body;
    if (!password)
      return res.status(400).send({ message: "Password is required" });

    const hashedPassword = await hash(password);
    const updatedUser = await Auth.findByIdAndUpdate(
      _id,
      { password: hashedPassword },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Password changed successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
