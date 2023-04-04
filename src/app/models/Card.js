const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var Card = new Schema({
    player_img: { type: String },
    player_name: { type: String },
    rating: { type: String },
    pos: { type: String },
    flag: { type: String },
    background: { type: String },
    event: { type: String },
    event_slug: { type: String },
}, {
    timestamps: true,
    autoIndex: true
});






module.exports = mongoose.model('Card', Card);
