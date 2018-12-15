const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserAgentSchema = new Schema({
  pageVisitId: String,
  userAgent: String,
  software: String,
  softwareName: String,
  softwareNameCode: String,
  softwareVersion: String,
  softwareVersionFull: [String],
  simpleSoftwareString: String,
  simpleOperatingPlatformString: String,
  operatingSystem: String,
  operatingSystemName: String,
  operatingSystemVersion: String,
  operatingSystemVersionFull: [String],
  operatingSystemNameCode: String,
  status: String,
});

const UserAgent = mongoose.model('UserAgent', UserAgentSchema);

module.exports = {
  UserAgentSchema,
  UserAgent,
}
