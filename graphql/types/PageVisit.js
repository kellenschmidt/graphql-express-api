const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const { UserAgentType } = require('./UserAgent');
const { IpAddressType } = require('./IpAddress');

exports.PageVisitType = new GraphQLObjectType({
  name: 'PageVisit',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    path: { type: GraphQLString },
    referrer: { type: GraphQLString },
    ipAddress: { type: new GraphQLNonNull(IpAddressType) },
    userAgent: { type: new GraphQLNonNull(UserAgentType) },
  })
});
