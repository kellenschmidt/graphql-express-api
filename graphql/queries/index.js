const { GraphQLObjectType, GraphQLString } = require('graphql');
const { UserAgentType } = require('../types/UserAgent');
const { PageVisitType } = require('../types/PageVisit');
const { IpAddressType } = require('../types/IpAddress');
const { UserAgent } = require('../../models/UserAgent');
const { PageVisit } = require('../../models/PageVisit');
const { IpAddress } = require('../../models/IpAddress');

exports.QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    pageVisit: {
      type: PageVisitType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("Query for PageVisit");
        return PageVisit.findById(args.id);
        // return PageVisit.find();
        
      }
    },
  }
});
