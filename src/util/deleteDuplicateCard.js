
const Event = require('../app/models/Event')
const Card = require('../app/models/Card')

function delDuplicate() {
    // Card.find()
    //     .then(cards => {
    //         cards.forEach(card => {
    //             Card.findOne({ player_img: card.player_img }).then(doc => {
    //                 console.log(doc)
    //                 if (doc !== null) {
    //                     Card.deleteMany({ player_img: doc.player_img }).then(() => {
    //                         Card.insertOne(doc);
    //                     }).catch(err => { console.log(err) });
    //                     console.log('Duplicate deleleted successfully ' + doc.player_name + '  ' + doc.event_slug);
    //                 }
    //             })
    //         })
    //     }).then(() => {
    //         console.log('Done ')
    //     })

    Card.aggregate([
        { "$group": { "player_img": "$player_img", "count": { "$sum": 1 } } },
        { "$match": { "player_img": { "$ne": null }, "count": { "$gt": 1 } } },
        { "$sort": { "count": -1 } },
        { "$project": { "name": "$player_img", "player_img": 0 } }
    ]).then(data => {
        var dr = data.map(d => d.player_img);
        console.log("duplicate Recods:: ", dr);
        Card.remove({ id: { $in: dr } }).then(removedD => {
            console.log("Removed duplicate Data:: ", removedD);
        })
    })
}


module.exports = { delDuplicate }