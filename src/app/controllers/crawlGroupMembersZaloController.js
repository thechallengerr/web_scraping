const Groupz = require("../models/Groupz");
const { mongooseToMultipleObject, mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { getSpecificGroupMembers } = require('../../util/group_members_zalo.js');
const fs = require('fs');
const path = require('path');
const csvReader = require('csv-parser');
const mongoose = require("../../util/mongoose.js");
class crawlGroupsZaloController {
  //[GET] /crawl-friends-fb
  index(req, res) {
    res.render("group-members-zalo/group-members-zalo");
  }


  // [POST] /group-members-zalo/crawl
  crawl(req, res, next) {
    let data;
    getSpecificGroupMembers(req.body.groupName, data)
      .then(data => {
        console.log(data);
        res.render('group-members-zalo/result', data);
      })
      .catch((err) => {
        console.log(err);
        res.render('_404');
      });

  }

  //[GET] /group-members-zalo/results
  results(req, res, next) {
    Groupz.find({})
      .sort({ updatedAt: -1, })
      .then(groupzs => {
        // res.render('/group-members-zalo/result', groupzs)
        res.json(groupzs);
      })
  }
}


module.exports = new crawlGroupsZaloController();
