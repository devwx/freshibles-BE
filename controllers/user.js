import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function handleLogin(req, res) {
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid email or password" });
    }

    // Create the payload for the JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
}

export async function handleSignUp(req, res) {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: "existing user found with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hashedPassword,
    });
    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function handleFetchUser(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token and expiry time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update the user's resetPasswordToken and resetPasswordExpiry fields
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    // Define the email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link or paste it into your browser to complete the process:\n\nhttps://freshibles.vercel.app/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user by the reset token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    // If the user or token is not valid, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordExpiry = "";
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
