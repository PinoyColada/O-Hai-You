const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const flashCardSchema = new Schema(
  {
    question: {
      type: String,
      trim: true,
      required: true,
    },
    answer: {
      public_id: "",
      url: "",
    },
    set_id: {
      type: ObjectId,
      ref: "Set",
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlashCard", flashCardSchema);
