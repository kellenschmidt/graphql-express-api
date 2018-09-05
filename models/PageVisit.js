const mongoose = require('mongoose');
const { Schema } = mongoose;

const PageVisitSchema = new Schema({
  path: String,
  referrer: String,
});

const PageVisit = mongoose.model('PageVisit', PageVisitSchema);

module.exports = {
  PageVisitSchema,
  PageVisit,
}
