const { query } = require('./resolvers/query')
const { types } = require('./resolvers/types')
const { mutation } = require('./resolvers/mutation')

exports.resolvers = {
  ...query,
  ...types,
  ...mutation,
}
