const mongoose = require('mongoose');
const { Schema } = mongoose;
const { UserAgentSchema } = require('./UserAgent');

const PageVisitSchema = new Schema({
  path: String,
  referrer: String,
  // userAgent: { type: Schema.Types.ObjectId, ref: 'UserAgent' },
  userAgent: UserAgentSchema,
});

const PageVisitModel = mongoose.model('PageVisit', PageVisitSchema);

module.exports = {
  PageVisitSchema,
  PageVisitModel,
}
