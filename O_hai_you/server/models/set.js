const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const setSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      public_id: "",
      url: "",
    },
    urlPreview: {},
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Set", setSchema);
