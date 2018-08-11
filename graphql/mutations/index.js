const { GraphQLObjectType } = require('graphql');
var { addUserAgent } = require('./userAgent');
var { addPageVisit } = require('./pageVisit');
var { addIpAddress } = require('./ipAddress');

exports.MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUserAgent,
    addPageVisit,
    addIpAddress,
  }
});
