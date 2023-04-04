const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var League = new Schema({
    league_name: { type: String },
    league_img: { type: String },
    clubs: { type: Array },

}, {
    timestamps: true,
    autoIndex: true
});






module.exports = mongoose.model('League', League);
