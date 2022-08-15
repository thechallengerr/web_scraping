const crawlFriendFbRoute = require("./crawl-friends-fb.js");
const autoChatZaloRoute = require("./auto-chat-zalo.js");
const crawlGroupsZaloRoute = require("./crawl-groups-zalo.js");
const groupMembersZaloRoute = require("./group-members-zalo.js");
const checkZaloNameRoute = require("./check-zalo-name.js");
const busboy = require("connect-busboy");
const cors = require("cors");
function route(app) {
  app.use(cors());
  app.use(busboy());
  app.use("/crawl-friends-fb", crawlFriendFbRoute);
  app.use("/auto-chat-zalo", autoChatZaloRoute);
  app.use("/crawl-groups-zalo", crawlGroupsZaloRoute);
  app.use("/group-members-zalo", groupMembersZaloRoute);
  app.use("/check-zalo-name", checkZaloNameRoute);
  app.get("/", (req, res) => {
    res.render("home");
  });


  app.get("/crawl-contacts-zalo", (req, res) => {
    res.render("crawl-contacts-zalo");
  });
}

module.exports = route;
