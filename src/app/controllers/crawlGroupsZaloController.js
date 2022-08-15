const Groupz = require("../models/Groupz");
const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { getAllZaloGroups } = require('../../util/zalo_groups.js');
const fs = require('fs');
const path = require('path');
const csvReader = require('csv-parser');
class crawlGroupsZaloController {
  //[GET] /crawl-friends-fb
  index(req, res) {
    res.render("crawl-groups-zalo/crawl-groups-zalo");
  }


  // [POST] /crawl-groups-zalo/crawl
  crawl(req, res, next) {
    let data;
    getAllZaloGroups(data)
      .then(groups => {
        console.log(groups);
        res.redirect('/crawl-groups-zalo/groups')
      })
      .catch((err) => {
        console.log(err);
        res.render('_404');
      });

  }

  // [GET] /crawl-groups-zalo/result
  results(req, res, next) {
    Groupz.find({})
      .sort({ groupQuantity: -1, })
      .then(groupzs => {
        res.render('crawl-groups-zalo/result', {
          groupzs: mongooseToMultipleObjects(groupzs)
        })
        // res.json(groupzs);
      })
  }
}


module.exports = new crawlGroupsZaloController();
