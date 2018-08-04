const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserAgentSchema = new Schema({
  userAgent: String,
  uaType: String,
  uaBrand: String
});

module.exports = mongoose.model('UserAgent', UserAgentSchema);
