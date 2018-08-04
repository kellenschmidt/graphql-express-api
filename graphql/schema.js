const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const UserAgentType = require('./UserAgentType');
const UserAgent = require('./../models/UserAgent')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    userAgent: {
      type: UserAgentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return UserAgent.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
