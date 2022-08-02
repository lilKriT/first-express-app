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

// Set up a static folder
app.use(express.static(path.join(__dirname, "public")));

// port. either env variable, or 5000
const PORT = process.env.PORT || 5000;

// listening. port and a callback function
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
