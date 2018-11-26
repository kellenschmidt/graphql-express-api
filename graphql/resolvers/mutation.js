const { PageVisit } = require('../../models/PageVisit');
const { UserAgent } = require('../../models/UserAgent');
const { IpAddress } = require('../../models/IpAddress');
const axios = require('axios');

async function createUserAgentModel(args) {
  const uaModel = new UserAgent(args);
  uaModel.datetime = new Date().toString();
  uaModel.userAgent = args.userAgent;

  const apiDataResponse = await getUserAgentApiData(args.userAgent);
  uaModel.status = apiDataResponse.result.message;
  const apiData = apiDataResponse.parse || null;
  if (apiData) {
    uaModel.software = apiData.software;
    uaModel.softwareName = apiData.software_name;
    uaModel.softwareNameCode = apiData.software_name_code;
    uaModel.softwareVersion = apiData.software_version;
    uaModel.softwareVersionFull = apiData.software_version_full;
    uaModel.simpleSoftwareString = apiData.simple_software_string;
    uaModel.simpleOperatingPlatformString = apiData.simple_operating_platform_string;
    uaModel.operatingSystem = apiData.operating_system;
    uaModel.operatingSystemName = apiData.operating_system_name;
    uaModel.operatingSystemVersion = apiData.operating_system_version;
    uaModel.operatingSystemVersionFull = apiData.operating_system_version_full;
    uaModel.operatingSystemNameCode = apiData.operating_system_name_code;    
  }
  
  return uaModel;
}

async function getUserAgentApiData(userAgent) {
  const body = { "user_agent": userAgent };
  const headers = { "X-API-KEY": process.env.UA_API_KEY };
  const response = await axios.post("https://api.whatismybrowser.com/api/v2/user_agent_parse", body, { headers });
  console.log("UserAgent API Response:", response.data);
  return response.data;
}

async function createIpAddressModel(params) {
  const ipaModel = new IpAddress(params);

  const apiData = await getIpAddressApiData(params.ipAddress);
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
  const response = await axios.get('http://ip-api.com/json/' + ipAddress);
  console.log("IP Address API Response:", response.data);
  return response.data;
}

exports.mutation = {
  Mutation: {
    createPageVisit: async (root, { path, referrer, ipAddress }, { userAgent }, info) => {
      const pageVisitModel = new PageVisit({ path: path, referrer: referrer });
      const newPageVisit = await pageVisitModel.save();
      if (!newPageVisit) {
        throw new Error('Error');
      }

      const ipAddressModel = await createIpAddressModel({ ipAddress: ipAddress, pageVisitId: newPageVisit._id });
      const newIpAddress = await ipAddressModel.save();
      const userAgentModel = await createUserAgentModel({ userAgent: userAgent, pageVisitId: newPageVisit._id });
      const newUserAgent = await userAgentModel.save();
      if (!newUserAgent || !newIpAddress) {
        throw new Error('Error');
      }

      return newPageVisit;
    },
  },
}
