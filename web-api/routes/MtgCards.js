const express = require("express");
const router = express.Router({ mergeParams: true });
const MtgCards = require("../controllers/MtgCards");

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};
router.get("/cardSearch/:cardName", catchAsync(MtgCards.searchMtgCard)); //SEARCH
router.get("/set_name/:set_name", catchAsync(MtgCards.getMtgCardsBySet)); //SEARCH
router.get("/card_name/:card_name", catchAsync(MtgCards.getMtgCardsByCardName)); //SEARCH

router
  .route("/:id")
  .get(catchAsync(MtgCards.getMtgCard))
  .put(catchAsync(MtgCards.editMtgCard));

router.post("/addcard", catchAsync(MtgCards.postMtgCard)); //ADD CARD

module.exports = router;
