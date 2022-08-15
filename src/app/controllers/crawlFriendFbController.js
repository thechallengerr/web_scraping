const Friend = require("../models/Friend");
const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { fbFriendsCrawler, data } = require('../../util/fbcrawler.js');
const fs = require('fs');
const csvReader = require('csv-parser');

class CrawlFriendFbController {
  //[GET] /crawl-friends-fb
  index(req, res) {
    res.render("crawl-friends-fb");
  }

  //[GET] /crawl-friends-fb
  details(req, res, next) {
    res.send('results')
    // res.send(!req.body ? "Nothings found" : res.json(req.body));

  }
  // [POST] /crawl-friends-fb/result
  crawl(req, res, next) {
    console.log(req.body);
    let data = [];
    fbFriendsCrawler(req.body.email, req.body.password, 'friends', data).then(data => { console.log(data); });
    res.json(data);
  }
}


module.exports = new CrawlFriendFbController();
