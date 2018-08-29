const { PageVisit } = require('../../models/PageVisit');
const { UserAgent } = require('../../models/UserAgent');
const { IpAddress } = require('../../models/IpAddress');
const axios = require('axios');

async function createUserAgentModel(args) {
  const uaModel = new UserAgent(args);
  uaModel.datetime = new Date().toString();

  let apiData = await getUserAgentApiData(args.userAgent);
  uaModel.uaType = apiData.ua_type;
  uaModel.uaBrand = apiData.ua_brand;
  uaModel.uaName = apiData.ua_name;
  uaModel.uaVersion = apiData.ua_version;
  uaModel.uaUrl = apiData.ua_url;
  uaModel.osName = apiData.os_name;
  uaModel.osVersion = apiData.os_version;
  uaModel.browserName = apiData.browser_name;
  uaModel.browserVersion = apiData.browser_version;
  uaModel.engineName = apiData.engine_name;
  uaModel.engineVersion = apiData.engine_version;

  return uaModel;
}

async function getUserAgentApiData(userAgent) {
  var ua = encodeURIComponent(userAgent).replace(/%20/g, '+');
  var response = await axios.get('http://useragentapi.com/api/v4/json/5a8d9934/' + ua);
  console.log("UserAgent API Response:");
  console.log(response.data);
  return response.data.data;
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
  var response = await axios.get('http://ip-api.com/json/' + ipAddress);
  console.log("IP Address API Response:");
  console.log(response.data);
  return response.data;
}

exports.mutation = {
  Mutation: {
    createPageVisit: async (root, { path, referrer, ipAddress }, request, info) => {
      const pageVisitModel = new PageVisit({ path: path, referrer: referrer });
      const newPageVisit = await pageVisitModel.save();
      if (!newPageVisit) {
        throw new Error('Error');
      }

      const ipAddressModel = await createIpAddressModel({ ipAddress: ipAddress, pageVisitId: newPageVisit._id });
      const newIpAddress = await ipAddressModel.save();
      const userAgentModel = await createUserAgentModel({ userAgent: request.headers['user-agent'], pageVisitId: newPageVisit._id });
      const newUserAgent = await userAgentModel.save();
      if (!newUserAgent || !newIpAddress) {
        throw new Error('Error');
      }

      return newPageVisit;
    },
  },
}
