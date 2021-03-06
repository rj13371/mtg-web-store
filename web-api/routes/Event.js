const express = require("express");
const router = express.Router({ mergeParams: true });
const Event = require("../controllers/Event");

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => next(e));
  };
};

router.get("/getAllEvents", catchAsync(Event.getAllEvents));
router.post("/createEvent", catchAsync(Event.createEvent));

router.put("/markComplete/:id", catchAsync(Event.toggleComplete));

router
  .route("/:id")
  .get(catchAsync(Event.getEvent))
  .put(catchAsync(Event.editEvent))
  .delete(catchAsync(Event.deleteEvent));

module.exports = router;
