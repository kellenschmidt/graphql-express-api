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
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, params, { request }) {
    const pageVisit = new PageVisit({path: params.path, referrer: params.referrer});
    pageVisit.ipAddress = await createIpAddressModel({ ipAddress: params.ipAddress });
    pageVisit.userAgent = await createUserAgentModel({ userAgent: request.headers['user-agent'] });

    const newPageVisit = pageVisit.save();
    if (!newPageVisit) {
      throw new Error('Error');
    }
    return newPageVisit;
  }
}
