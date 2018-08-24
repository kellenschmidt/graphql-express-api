const { PageVisit } = require('../../models/PageVisit');
const { UserAgent } = require('../../models/UserAgent');
const { IpAddress } = require('../../models/IpAddress');

exports.query = {
  Query: {
    pageVisit: async (root, { _id }) => {
      return (await PageVisit.findOne({ _id: _id }))
    },
    pageVisits: async () => {
      return (await PageVisit.find({}))
    },
    userAgent: async (root, { _id }) => {
      return (await UserAgent.findOne({ _id: _id }))
    },
    userAgents: async () => {
      return (await UserAgent.find({}))
    },
    ipAddress: async (root, { _id }) => {
      return (await IpAddress.findOne({ _id: _id }))
    },
    ipAddresses: async () => {
      return (await IpAddress.find({}))
    },
  },
}
