const express = require("express");
const router = express.Router({ mergeParams: true });
const Auth = require("../controllers/Auth");

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};
router.get("/isAuth", catchAsync(Auth.checkToken)); //check auth

module.exports = router;
