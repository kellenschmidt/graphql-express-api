const { GraphQLNonNull, GraphQLString } = require('graphql');
const { UserAgentType } = require('../types/UserAgent');
const { UserAgent } = require('../../models/UserAgent');
const axios = require('axios');

const addUserAgent = {
  type: UserAgentType,
  args: {
    userAgent: { type: new GraphQLNonNull(GraphQLString) },
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(root, params) {
    let uaModel = createUserAgentModel(params);
  
    const newUA = uaModel.save();
    if (!newUA) {
      throw new Error('Error');
    }
    return newUA;
  }
}

async function createUserAgentModel(params) {
  const uaModel = new UserAgent(params);
  uaModel.datetime = new Date().toString();

  let apiData = await getUserAgentApiData(params.userAgent);
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
  console.log("HTTP Response:");
  console.log(response.data);
  return response.data.data;
}

module.exports = {
  addUserAgent,
  createUserAgentModel,
}
