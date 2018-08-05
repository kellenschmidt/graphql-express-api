const { GraphQLObjectType, GraphQLString } = require('graphql');

exports.UserAgentType = new GraphQLObjectType({
  name: 'UserAgent',
  fields: () => ({
    id: { type: GraphQLString },
    userAgent: { type: GraphQLString },
    ipAddress: { type: GraphQLString },
    uaType: { type: GraphQLString },
    uaBrand: { type: GraphQLString },
    uaName: { type: GraphQLString },
    uaVersion: { type: GraphQLString },
    uaUrl: { type: GraphQLString },
    osName: { type: GraphQLString },
    osVersion: { type: GraphQLString },
    browserName: { type: GraphQLString },
    browserVersion: { type: GraphQLString },
    engineName: { type: GraphQLString },
    engineVersion: { type: GraphQLString },
    datetime: { type: GraphQLString },
  })
});
