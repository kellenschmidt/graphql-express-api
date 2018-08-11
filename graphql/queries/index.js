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
    userAgent: {
      type: UserAgentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return UserAgent.findById(args.id)
      }
    },
    pageVisit: {
      type: PageVisitType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return PageVisit.findById(args.id)
      }
    },
    ipAddress: {
      type: IpAddressType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return IpAddress.findById(args.id)
      }
    },
  }
});
