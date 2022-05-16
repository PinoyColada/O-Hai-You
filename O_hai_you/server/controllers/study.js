const Set = require("../models/set");
const FlashCard = require("../models/flashcard");

const createSet = async (req, res) => {
  try {
    const newSet = await new Set(req.body);
    await newSet.save();
    return res.status(201).json({ newSet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createFlashCard = async (req, res) => {
  try {
    const newCard = await new FlashCard(req.body);
    await newCard.save();
    return res.status(201).json({ newCard });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSet,
  createFlashCard,
};
