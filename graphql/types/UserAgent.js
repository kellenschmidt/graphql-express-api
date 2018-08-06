const { GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLNonNull, GraphQLID } = require('graphql');

exports.UserAgentType = new GraphQLObjectType({
  name: 'UserAgent',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    userAgent: { type: new GraphQLNonNull(GraphQLString) },
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
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
    datetime: { type: new GraphQLNonNull(GraphQLString) },
  })
});

exports.UserAgentInputType = new GraphQLInputObjectType({
  name: 'UserAgentInput',
  fields: () => ({
    userAgent: { type: new GraphQLNonNull(GraphQLString) },
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  })
});
