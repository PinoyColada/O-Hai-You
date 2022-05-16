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
      user_id: req.params.set_id,
    }).populate("set_id");
    return res.status(200).json({ setFlashCards });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSet,
  createFlashCard,
};
