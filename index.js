// to run this, in terminal write: node index
const express = require("express"); // importing express
const path = require("path");

// initializing the app
const app = express();

// creating routes
app.get("/", (req, res) => {
  //   res.send("<h1>Hello Express!</h1>");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// port. either env variable, or 5000
const PORT = process.env.PORT || 5000;

// listening. port and a callback function
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
