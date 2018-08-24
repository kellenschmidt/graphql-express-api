const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
