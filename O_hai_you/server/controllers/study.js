const Set = require("../models/set");
const FlashCard = require("../models/flashcard");

exports.createSet = async (req, res) => {
  try {
    const set = await new Set({ ...req.body, user_id: req.user._id }).save();
    res.send(set);
  } catch (error) {
    throw error;
  }
};

exports.createFlashCard = async (req, res) => {
  try {
    const flashCard = await new FlashCard({
      ...req.body,
      set_id: req.set._id,
    }).save();
    res.send(flashCard);
  } catch (error) {
    throw error;
  }
};

exports.getAllUserSets = async (req, res) => {
  try {
    const userSets = await Set.find({
      user_id: req.params.user_id,
    }).populate("user_id");
    return res.status(200).json({ userSets });
  } catch (error) {
    throw error;
  }
};

exports.getAllSetFlashCards = async (req, res) => {
  try {
    const setFlashCards = await FlashCard.find({
      set_id: req.params.set_id,
    }).populate("set_id");
    return res.status(200).json({ setFlashCards });
  } catch (error) {
    throw error;
  }
};

exports.updateSet = async (req, res) => {
  try {
    const set = await Set.findByIdAndUpdate(req.params.set_id, req.body, {
      new: true,
    });
    res.json(set);
  } catch (error) {
    throw error;
  }
};

exports.updateFlashCard = async (req, res) => {
  try {
    const flashCard = await FlashCard.findByIdAndUpdate(
      req.params.flashcard_id,
      req.body,
      {
        new: true,
      }
    );
    res.json(flashCard);
  } catch (error) {
    throw error;
  }
};

exports.deleteSet = async (req, res) => {
  try {
    const setId = req.params.set_id;
    const deleted = await Set.findByIdAndDelete(setId);
    return res.status(200).status(deleted);
  } catch (error) {
    throw error;
  }
};

exports.deleteFlashCard = async (req, res) => {
  try {
    const flashcardId = req.params.flashcard_id;
    const deleted = await FlashCard.findByIdAndDelete(flashcardId);
    return res.status(200).status(deleted);
  } catch (error) {
    throw error;
  }
};
