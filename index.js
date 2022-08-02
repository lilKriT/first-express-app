// to run this, in terminal write: node index
const express = require("express"); // importing express
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

// initializing the app
const app = express();

// Init middleware
// app.use(logger);

// creating routes
// app.get("/", (req, res) => {
//   //   res.send("<h1>Hello Express!</h1>");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// more routes
// Route to get all members
app.get("/api/members", (req, res) => {
  res.json(members);
});

// Get a single member
// : means url parameter
app.get("/api/members/:id", (req, res) => {
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

// Set up a static folder
app.use(express.static(path.join(__dirname, "public")));

// port. either env variable, or 5000
const PORT = process.env.PORT || 5000;

// listening. port and a callback function
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
