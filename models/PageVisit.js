const mongoose = require('mongoose');
const { Schema } = mongoose;

const PageVisitSchema = new Schema({
  userId: Number,
  path: String,
  referrer: String,
  datetime: Date,
});

const PageVisit = mongoose.model('PageVisit', PageVisitSchema);

module.exports = {
  PageVisitSchema,
  PageVisit,
}
