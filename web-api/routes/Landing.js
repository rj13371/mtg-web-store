const express = require("express");
const router = express.Router({ mergeParams: true });
const Landing = require("../controllers/Landing");

//returns func that catches errors in async functions
const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};

router.get("/landings", catchAsync(Landing.getLanding));
router.put("/editLanding", catchAsync(Landing.editLanding));

module.exports = router;
