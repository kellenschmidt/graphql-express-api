const mongoose = require('mongoose');
const { Schema } = mongoose;
const { UserAgentSchema } = require('./UserAgent');

const PageVisitSchema = new Schema({
  path: String,
  referrer: String,
  userAgent: UserAgentSchema,
});

const PageVisit = mongoose.model('PageVisit', PageVisitSchema);

module.exports = {
  PageVisitSchema,
  PageVisit,
}
