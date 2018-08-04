const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserAgentType = new GraphQLObjectType({
  name: 'UserAgent',
  fields: () => ({
    id: { type: GraphQLString },
    userAgent: { type: GraphQLString },
    uaType: { type: GraphQLString },
    uaBrand: { type: GraphQLString },
  })
});

module.exports = UserAgentType;
