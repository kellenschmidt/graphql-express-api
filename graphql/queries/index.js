const { GraphQLObjectType, GraphQLString } = require('graphql');
const { UserAgentType } = require('../types/UserAgentType');
const UserAgent = require('../../models/UserAgent');

exports.QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    userAgent: {
      type: UserAgentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return UserAgent.findById(args.id)
      }
    }
  }
});
