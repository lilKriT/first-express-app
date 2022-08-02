const express = require("express");
const router = express.Router();
const members = require("../../Members");

// Route to get all members
router.get("/", (req, res) => {
  res.json(members);
});

// Get a single member
// : means url parameter
router.get("/:id", (req, res) => {
  //   res.send(req.params.id);  // very simple resopnse, just the ID
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(
      members.filter((member) => {
        // careful. params are a string!
        return member.id === parseInt(req.params.id);
      })
    );
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
