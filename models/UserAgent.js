const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserAgentSchema = new Schema({
  pageVisitId: String,
  userAgent: String,
  uaType: String,
  uaBrand: String,
  uaName: String,
  uaVersion: String,
  uaUrl: String,
  osName: String,
  osVersion: String,
  browserName: String,
  browserVersion: String,
  engineName: String,
  engineVersion: String,
  datetime: Date,
});

const UserAgent = mongoose.model('UserAgent', UserAgentSchema);

module.exports = {
  UserAgentSchema,
  UserAgent,
}
