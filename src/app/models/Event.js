const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Event = new Schema({
  event_name: { type: String },
  event_shortname: { type: String },
  event_thumb: { type: String, },
  event_slug: { type: String, lowercase: true },

}, {
  timestamps: true,
  autoIndex: true,
});

module.exports = mongoose.model('Event', Event);
