const mongoose = require('mongoose');
const { Schema } = mongoose;

const IpAddressSchema = new Schema({
  status: String,
  country: String,
  countryCode: String,
  region: String,
  regionName: String,
  city: String,
  zip: String,
  lat: Number,
  lon: Number,
  timezone: String,
  isp: String,
  org: String,
  as: String,
  query: String,
});

const IpAddress = mongoose.model('IpAddress', IpAddressSchema);

module.exports = {
  IpAddressSchema,
  IpAddress,
}
