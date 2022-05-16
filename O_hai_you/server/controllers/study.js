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

module.exports = {
  createSet,
  createFlashCard,
};
