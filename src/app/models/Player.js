/* */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Player = new Schema({
    background: { type: String },
    player_img: { type: String },
    event: { type: String },
    event_slug: { type: String },
    flag: { type: String },
    rating: { type: Number },
    position: { type: String },
    name: { type: String },
    full_name: { type: String },
    career: { type: Object },
    stats: {
        type: Object,
    },
}, {
    timestamps: true,
    autoIndex: true
});

module.exports = mongoose.model('Player', Player);
