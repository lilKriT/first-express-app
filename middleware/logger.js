const moment = require("moment");

// created a logger
const logger = (req, res, next) => {
  //   console.log("Hey");
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next(); // you always have to call next
};

module.exports = logger;
