const { GraphQLNonNull, GraphQLString } = require('graphql');
const { PageVisitType } = require('../types/PageVisit');
const { PageVisit } = require('../../models/PageVisit');
const { createUserAgentModel } = require('./userAgent');
const { createIpAddressModel } = require('./ipAddress');
const Ip = require("ip");
const axios = require('axios');

exports.addPageVisit = {
  type: PageVisitType,
  args: {
    path: { type: new GraphQLNonNull(GraphQLString) },
    referrer: { type: GraphQLString },
  },
  async resolve(root, params, { request }) {
    const pageVisit = new PageVisit(params);
    console.log("Ip.address(): ", Ip.address());
    var response = await axios.get('https://api.ipify.org?format=json');
    console.log("ipify.com: ", response.data);
    pageVisit.ipAddress = await createIpAddressModel({ ipAddress: Ip.address() });
    pageVisit.userAgent = await createUserAgentModel({ userAgent: request.headers['user-agent'] });

    const newPageVisit = pageVisit.save();
    if (!newPageVisit) {
      throw new Error('Error');
    }
    return newPageVisit;
  }
}
