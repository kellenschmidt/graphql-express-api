const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const { UserAgentType } = require('./UserAgent');
const { IpAddressType } = require('./IpAddress');

exports.PageVisitType = new GraphQLObjectType({
  name: 'PageVisit',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    path: { type: GraphQLString },
    referrer: { type: GraphQLString },
    ipAddress: {
      type: new GraphQLNonNull(IpAddressType),
      args: { test: { type: GraphQLString } },
      resolve: (parent, { test }, context, info) => {
        
        return parent.ipAddress;
      }
    },
    userAgent: {
      type: new GraphQLNonNull(UserAgentType),
      args: { test: { type: GraphQLString } },
      resolve: (parent, { test }) => {
        console.log("Getting user agent, test: ", test)
        return parent.userAgent;
      }
    },
  })
});
