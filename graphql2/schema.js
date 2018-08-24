const { makeExecutableSchema } = require('graphql-tools');
const { PageVisit } = require('../models/PageVisit');
const { UserAgent } = require('../models/UserAgent');
const { IpAddress } = require('../models/IpAddress');
const axios = require('axios');

const typeDefs = [`
  type Query {
    pageVisit(_id: String): PageVisit
    pageVisits: [PageVisit]
    userAgent(_id: String): UserAgent
    userAgents: [UserAgent]
    ipAddress(_id: String): IpAddress
    ipAddresses: [IpAddress]
  }

  type PageVisit {
    _id: String
    path: String
    referrer: String
    userAgent: UserAgent
    ipAddress: IpAddress
  }

  type UserAgent {
    _id: String
    pageVisitId: String!
    userAgent: String!,
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
    datetime: String!,
    pageVisit: PageVisit,
  }

  type IpAddress {
    _id: String
    pageVisitId: String!,
    status: String,
    country: String,
    countryCode: String,
    region: String,
    regionName: String,
    city: String,
    zip: String,
    lat: Float,
    lon: Float,
    timezone: String,
    isp: String,
    org: String,
    as: String,
    query: String,
    pageVisit: PageVisit,
  }

  type Mutation {
    createPageVisit(path: String!, referrer: String, ipAddress: String!): PageVisit
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

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

const resolvers = {
  Query: {
    pageVisit: async (root, { _id }) => {
      return (await PageVisit.findOne({ _id: _id }))
    },
    pageVisits: async () => {
      return (await PageVisit.find({}))
    },
    userAgent: async (root, { _id }) => {
      return (await UserAgent.findOne({ _id: _id }))
    },
    userAgents: async () => {
      return (await UserAgent.find({}))
    },
    ipAddress: async (root, { _id }) => {
      return (await IpAddress.findOne({ _id: _id }))
    },
    ipAddresses: async () => {
      return (await IpAddress.find({}))
    },
  },
  PageVisit: {
    userAgent: async ({ _id }) => {
      return (await UserAgent.findOne({ pageVisitId: _id }))
    },
    ipAddress: async ({ _id }) => {
      return (await IpAddress.findOne({ pageVisitId: _id }))
    },
  },
  UserAgent: {
    pageVisit: async ({ pageVisitId }) => {
      return (await PageVisit.findOne({ _id: pageVisitId }))
    }
  },
  IpAddress: {
    pageVisit: async ({ pageVisitId }) => {
      return (await PageVisit.findOne({ _id: pageVisitId }))
    }
  },
  Mutation: {
    createPageVisit: async (root, { path, referrer, ipAddress }, request, info) => {
      const pageVisitModel = new PageVisit({ path: path, referrer: referrer });
      const newPageVisit = await pageVisitModel.save();
      if (!newPageVisit) {
        throw new Error('Error');
      }

      const ipAddressModel = await createIpAddressModel({ ipAddress: ipAddress, pageVisitId: newPageVisit._id });
      const userAgentModel = await createUserAgentModel({ userAgent: request.headers['user-agent'], pageVisitId: newPageVisit._id });
      const newUserAgent = await userAgentModel.save();
      const newIpAddress = await ipAddressModel.save();
      if (!newUserAgent || !newIpAddress) {
        throw new Error('Error');
      }

      return newPageVisit;
    },
  },
}

const schema2 = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = {
  schema2,
}
