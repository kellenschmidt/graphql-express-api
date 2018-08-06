const { GraphQLNonNull, GraphQLString } = require('graphql');
const { PageVisitType } = require('../types/PageVisit');
const { PageVisitModel } = require('../../models/PageVisit');
const { UserAgentInputType } = require('../types/UserAgent');
const { createUserAgentModel } = require('./userAgent');

exports.addPageVisit = {
  type: PageVisitType,
  args: {
    path: { type: new GraphQLNonNull(GraphQLString) },
    referrer: { type: GraphQLString },
    userAgent: { type: new GraphQLNonNull(UserAgentInputType) },
  },
  async resolve(root, params) {
    const pageVisitModel = new PageVisitModel(params);
    pageVisitModel.userAgent = await createUserAgentModel(params.userAgent);

    const newPageVisit = pageVisitModel.save();
    if (!newPageVisit) {
      throw new Error('Error');
    }
    return newPageVisit;
  }
}
