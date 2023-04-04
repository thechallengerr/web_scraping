const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var Nation = new Schema({
    nation: { type: String },
    flag: { type: String },
}, {
    timestamps: true,
    autoIndex: true
});






module.exports = mongoose.model('Nation', Nation);
