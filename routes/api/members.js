const express = require("express");
const uuid = require("uuid");
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

router.post("/", (req, res) => {
  //   res.send(req.body);    // this just sends back the data
  // were not using a DB, so we will get a new id from uuid

  // creating a new member
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  // checking the data
  if (!newMember.name || !newMember.email) {
    // if you get error "headers already set", use return here or use an else later
    return res.status(400).json({ msg: "Please include a name and email" });
  } else {
    members.push(newMember);
    return res.json(members);
    // return res.redirect("/");
  }
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

// Deleting member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter((member) => {
        return member.id !== parseInt(req.params.id);
      }),
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
