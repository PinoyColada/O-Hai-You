const express = require("express");

const router = express.Router();

const {
  createSet,
  createFlashCard,
  getAllUserSets,
  getAllSetFlashCards,
  updateSet,
  updateFlashCard,
  deleteSet,
  deleteFlashCard,
} = require("../controllers/study");

router.post("/create-set", createSet);
router.post("/create-flashcard", createFlashCard);
router.get("/sets/:userId", getAllUserSets);
router.get("/flashcards/:setId", getAllSetFlashCards);
router.put("/:setId", updateSet);
router.put("/:flashcardId", updateFlashCard);
router.delete("/:setId", deleteSet);
router.delete("/:flashcardId", deleteFlashCard);

module.exports = router;