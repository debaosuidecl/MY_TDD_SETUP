var express = require("express");
var router = express.Router();
const todos = [
  {
    id: 1,
    name: "do dishes",
    completed: false,
  },
  {
    id: 123,
    name: "brush teeth",
    completed: false,
  },
];

/* GET todos. */
router.get("/", function (req, res, next) {
  return res.status(200).json(todos);
});

/* GET TODO BY ID */

router.get("/:id", function (req, res, next) {
  // return res.status(200).json(todos);

  const id = req.params.id;

  const foundtodo = todos.find((todo) => todo.id == parseInt(id));

  if (!foundtodo) {
    return res.status(404).json({
      error: true,
      message: "Todo not found",
    });
  }

  return res.status(200).json(foundtodo);
});
router.post("/", function (req, res, next) {
  // return res.status(200).json(todos);

  const { name } = req.body;
  if (typeof name !== "string") {
    // return 422 iff name is a number
    return res.status(422).json({
      error: true,
      message: " Numbers not allowed",
    });
  }
  const newtodo = {
    name,
    id: Math.ceil(Math.random() * 100),
    completed: false,
  };
  todos.push(newtodo);

  return res.status(201).json(newtodo);
});
module.exports = router;
