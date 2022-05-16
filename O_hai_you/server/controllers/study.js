const Set = require("../models/set");
const FlashCard = require("../models/flashcard");

const createSet = async (req, res) => {
  const userId = parseInt(req.params.user_id);
  try {
    let buildBody = {
      user_id: userId,
      ...req.body,
    };
    const createSet = await new Set(buildBody);
    res.send(createSet);
  } catch (error) {
    throw error;
  }
};

const createFlashCard = async (req, res) => {
  const setId = parseInt(req.params.set_id);
  try {
    let buildBody = {
      set_id: setId,
      ...req.body,
    };
    const createCard = await new FlashCard(buildBody);
    res.send(createCard);
  } catch (error) {
    throw error;
  }
};

const getAllUserSets = async (req, res) => {
  try {
    const userSets = await Set.find({
      user_id: req.params.user_id,
    }).populate("user_id");
    return res.status(200).json({ userSets });
  } catch (error) {
    throw error;
  }
};

const getAllSetFlashCards = async (req, res) => {
  try {
    const setFlashCards = await FlashCard.find({
      set_id: req.params.set_id,
    }).populate("set_id");
    return res.status(200).json({ setFlashCards });
  } catch (error) {
    throw error;
  }
};

const updateSet = async (req, res) => {
  try {
    const set = await Set.findByIdAndUpdate(req.params.set_id, req.body, {
      new: true,
    });
    res.json(set);
  } catch (error) {
    throw error;
  }
};

const updateFlashCard = async (req, res) => {
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

const deleteSet = async (req, res) => {
  try {
    const setId = req.params.set_id;
    const deleted = await Set.findByIdAndDelete(setId);
    return res.status(200).status(deleted);
  } catch (error) {
    throw error;
  }
};

const deleteFlashCard = async (req, res) => {
  try {
    const flashcardId = req.params.flashcard_id;
    const deleted = await FlashCard.findByIdAndDelete(flashcardId);
    return res.status(200).status(deleted);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSet,
  createFlashCard,
  getAllUserSets,
  getAllSetFlashCards,
  updateSet,
  updateFlashCard,
  deleteSet,
  deleteFlashCard,
};
