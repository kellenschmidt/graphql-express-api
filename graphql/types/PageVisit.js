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
        console.log("Getting ip address, test: ", test);
        console.log("parent", parent);
        console.log("parent.ipAddress: ", parent.ipAddress);
        console.log("Context: ", context);
        console.log("Info: ", info);
        return parent.ipAddress;
      }
    },
    userAgent: {
      type: new GraphQLNonNull(UserAgentType),
      args: { test: { type: GraphQLString } },
      resolve: (parent, { test }) => {
        console.log("Getting user agent, test: ", test)
        // console.log(parent);
        return parent.userAgent;
      }
    },
  })
});
