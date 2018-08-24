const { PageVisit } = require('../../models/PageVisit');
const { UserAgent } = require('../../models/UserAgent');
const { IpAddress } = require('../../models/IpAddress');

exports.types = {
  PageVisit: {
    userAgent: async ({ _id }) => {
      return (await UserAgent.findOne({ pageVisitId: _id }))
    },
    ipAddress: async ({ _id }) => {
      return (await IpAddress.findOne({ pageVisitId: _id }))
    },
  },
  UserAgent: {
    pageVisit: async ({ pageVisitId }) => {
      return (await PageVisit.findOne({ _id: pageVisitId }))
    }
  },
  IpAddress: {
    pageVisit: async ({ pageVisitId }) => {
      return (await PageVisit.findOne({ _id: pageVisitId }))
    }
  },
}
