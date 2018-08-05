const { GraphQLObjectType } = require('graphql');
var { addUserAgent } = require('./userAgent');
var { addPageVisit } = require('./pageVisit');

exports.MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUserAgent,
    addPageVisit
  }
});
