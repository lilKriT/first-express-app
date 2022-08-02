const express = require("express"); // importing express

// initializing the app
const app = express();

// port. either env variable, or 5000
const PORT = process.env.PORT || 5000;

// listening. port and a callback function
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// to run this, in terminal write: node index
