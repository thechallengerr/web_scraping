const { mongooseToMultipleObjects } = require('../../util/mongoose.js');

const Card = require('../models/Card');
const Player = require('../models/Player');
const { crawlNations } = require('../../util/crawl_nations.js');
const { crawlLeagues } = require('../../util/crawl_leagues.js');
const { delDuplicate } = require('../../util/deleteDuplicateCard.js');
const { crawlStats } = require('../../util/crawl-stats.js');


class FmcardController {

    // [GET] /
    index(req, res, next) {

        Card.find()
            .then((cards) => {
                res.render('cards/cards',
                    {
                        cards: mongooseToMultipleObjects(cards),
                    })

            })
            .catch(next);
    }

    //[GET] /
    crawlLeagues(req, res, next) {
        crawlLeagues().then(() => {
            res.send('Done')
        });
    }

    //[GET] /
    crawlNations(req, res, next) {
        crawlNations().then(() => {

            res.send('Done');
        }).catch(next);


    }

    crawlStats(req, res, next) {
        crawlStats().then(function () {
            res.send('Done');

        });
    }



}


module.exports = new FmcardController();
