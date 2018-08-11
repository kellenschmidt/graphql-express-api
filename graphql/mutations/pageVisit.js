const { GraphQLNonNull, GraphQLString } = require('graphql');
const { PageVisitType } = require('../types/PageVisit');
const { PageVisit } = require('../../models/PageVisit');
const { createUserAgentModel } = require('./userAgent');
const Ip = require("ip");

exports.addPageVisit = {
  type: PageVisitType,
  args: {
    path: { type: new GraphQLNonNull(GraphQLString) },
    referrer: { type: GraphQLString },
    // userAgent: { type: new GraphQLNonNull(UserAgentInputType) },
  },
  async resolve(root, params, { request }) {
    const pageVisit = new PageVisit(params);
    pageVisit.ipAddress = Ip.address();
    pageVisit.userAgent = await createUserAgentModel({ userAgent: request.headers['user-agent'] });

    const newPageVisit = pageVisit.save();
    if (!newPageVisit) {
      throw new Error('Error');
    }
    return newPageVisit;
  }
}
