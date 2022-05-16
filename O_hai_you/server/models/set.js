const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const setSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Set", setSchema);
