
const fmcardRoute = require("./fmcard.js");
const busboy = require("connect-busboy");
const cors = require("cors");
function route(app) {
  app.use(cors());
  app.use(busboy());
  app.use("/fmcard", fmcardRoute);
  app.get("/", (req, res) => {
    res.render("home");
  });
}

module.exports = route;
