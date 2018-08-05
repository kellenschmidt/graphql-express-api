const { GraphQLObjectType } = require('graphql');
var { addUserAgent } = require('./userAgent');

exports.MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUserAgent
  }
});
