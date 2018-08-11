const { GraphQLNonNull, GraphQLString } = require('graphql');
const { IpAddressType } = require('../types/IpAddress');
const { IpAddress } = require('../../models/IpAddress');
const axios = require('axios');

const addIpAddress = {
  type: IpAddressType,
  args: {
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(root, params) {
    let ipaModel = createIpAddressModel(params);

    const newIpa = ipaModel.save();
    if (!newIpa) {
      throw new Error('Error');
    }
    return newIpa;
  }
}

async function createIpAddressModel(params) {
  const ipaModel = new IpAddress(params);

  let apiData = await getIpAddressApiData(params.ipAddress);
  ipaModel.status = apiData.status;
  ipaModel.country = apiData.country;
  ipaModel.countryCode = apiData.countryCode;
  ipaModel.region = apiData.region;
  ipaModel.regionName = apiData.regionName;
  ipaModel.city = apiData.city;
  ipaModel.zip = apiData.zip;
  ipaModel.lat = apiData.lat;
  ipaModel.lon = apiData.lon;
  ipaModel.timezone = apiData.timezone;
  ipaModel.isp = apiData.isp;
  ipaModel.org = apiData.org;
  ipaModel.as = apiData.as;
  ipaModel.query = apiData.query;

  return ipaModel;
}

async function getIpAddressApiData(ipAddress) {
  // var response = await axios.get('http://ip-api.com/json/' + ipAddress);
  var response = await axios.get('http://ip-api.com/json/');
  console.log("HTTP Response:");
  console.log(response.data);
  return response.data;
}

module.exports = {
  addIpAddress,
  createIpAddressModel,
}
