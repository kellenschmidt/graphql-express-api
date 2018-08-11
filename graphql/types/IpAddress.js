const { GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLFloat } = require('graphql');

exports.IpAddressType = new GraphQLObjectType({
  name: 'IpAddress',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: GraphQLString },
    country: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    region: { type: GraphQLString },
    regionName: { type: GraphQLString },
    city: { type: GraphQLString },
    zip: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    timezone: { type: GraphQLString },
    isp: { type: GraphQLString },
    org: { type: GraphQLString },
    as: { type: GraphQLString },
    query: { type: new GraphQLNonNull(GraphQLString) },
  })
});

exports.IpAddressInputType = new GraphQLInputObjectType({
  name: 'IpAddressInput',
  fields: () => ({
    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
  })
});
