const mongoose = require('mongoose');
const { Schema } = mongoose;
const { UserAgentSchema } = require('./UserAgent');
const { IpAddressSchema } = require('./IpAddress');

const PageVisitSchema = new Schema({
  path: String,
  referrer: String,
  ipAddress: IpAddressSchema,
  userAgent: UserAgentSchema,
});

const PageVisit = mongoose.model('PageVisit', PageVisitSchema);

module.exports = {
  PageVisitSchema,
  PageVisit,
}
