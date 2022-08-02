// to run this, in terminal write: node index
const express = require("express"); // importing express
const path = require("path");
// adding handlebars
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

// initializing the app
const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member app",
    members,
  })
);

// creating routes
// app.get("/", (req, res) => {
//   //   res.send("<h1>Hello Express!</h1>");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Initializing a body parser middleware - it's important for adding users
app.use(express.json()); // handles json
app.use(express.urlencoded({ extended: false })); // handles forms

// Set up a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", require("./routes/api/members"));

// port. either env variable, or 5000
const PORT = process.env.PORT || 5000;

// listening. port and a callback function
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
