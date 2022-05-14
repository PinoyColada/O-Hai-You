const User = require("../models/user");
const Set = require("../models/set");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const nanoid = require("nanoid");
const expressJwt = require("express-jwt");
const cloudinary = require("cloudinary");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// Create User
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    const hashedPassword = await hashPassword(password);
    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
