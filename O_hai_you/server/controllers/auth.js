const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../password_config/auth");
const { nanoid } = require("nanoid");
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
    const { username, firstName, lastName, email, password } = req.body;
    if (!username) {
      return res.json({
        error: "Username is required",
      });
    }
    if (!firstName) {
      return res.json({
        error: "First name is required",
      });
    }
    if (!lastName) {
      return res.json({
        error: "Last name is required",
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
    const username_exist = await User.findOne({ username });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    if (username_exist) {
      return res.json({
        error: "Username is taken",
      });
    }
    const hashedPassword = await hashPassword(password);
    try {
      const user = await new User({
        username,
        firstName,
        lastName,
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

// Get User
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// If user forgets password, they have the ability to reset it
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  const resetCode = nanoid(5).toUpperCase();
  user.resetCode = resetCode;
  user.save();
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Password reset code",
    html: `
      <h4>Enter this code in the app to reset password</h4>
      <h1 style="color:red;">${resetCode}</h1>
      `,
  };
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    const user = await User.findOne({ email, resetCode });
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: nanoid(),
      resource_type: "jpg",
    });
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );
    return res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update a password of a user
exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should at least be 6 characters long",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      });
      user.password = undefined;
      user.secret = undefined;
      return res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.userId).select(
      "-password -secret"
    );
    const sets = await Set.find({ postedBy: req.params.userId }).populate(
      "postedBy",
      "_id"
    );
    return res.json({ profile, sets });
  } catch (err) {
    console.log(err);
  }
};

// Delete a user
exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user_id);
    res.json({ msg: "User has been deleted!" });
  } catch (err) {
    console.log(err);
  }
};
