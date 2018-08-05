const { GraphQLSchema } = require('graphql');
const { QueryType } = require('./queries/index');
const { MutationType } = require('./mutations/index')

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
