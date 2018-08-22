const { GraphQLNonNull, GraphQLString } = require('graphql');
const { PageVisitType } = require('../types/PageVisit');
const { PageVisit } = require('../../models/PageVisit');
const { createUserAgentModel } = require('./userAgent');
const { createIpAddressModel } = require('./ipAddress');

exports.addPageVisit = {
  type: PageVisitType,
  args: {
    path: { type: new GraphQLNonNull(GraphQLString) },
    referrer: { type: GraphQLString },
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, { path, referrer, ipAddress }, request) {
    const pageVisit = new PageVisit({path: path, referrer: referrer});
    pageVisit.ipAddress = await createIpAddressModel({ ipAddress: ipAddress });
    pageVisit.userAgent = await createUserAgentModel({ userAgent: request.headers['user-agent'] });

    const newPageVisit = pageVisit.save();
    if (!newPageVisit) {
      throw new Error('Error');
    }
    return newPageVisit;
  }
}
