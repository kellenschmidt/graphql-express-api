const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const { UserAgentType } = require('./UserAgent');

exports.PageVisitType = new GraphQLObjectType({
  name: 'PageVisit',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    path: { type: GraphQLString },
    referrer: { type: GraphQLString },
    userAgent: { type: new GraphQLNonNull(UserAgentType) },
  })
});
