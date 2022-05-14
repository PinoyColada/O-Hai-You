const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const flashCardSchema = new mongoose.Schema(
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
    createdIn: {
      type: ObjectId,
      ref: "Set",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlashCard", flashCardSchema);
