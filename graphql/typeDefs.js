exports.typeDefs = [`
  type Query {
    pageVisit(_id: String): PageVisit
    pageVisits: [PageVisit]
    userAgent(_id: String): UserAgent
    userAgents: [UserAgent]
    ipAddress(_id: String): IpAddress
    ipAddresses: [IpAddress]
  }

  type PageVisit {
    _id: String
    path: String
    referrer: String
    userAgent: UserAgent
    ipAddress: IpAddress
  }

  type UserAgent {
    _id: String
    pageVisitId: String!
    userAgent: String!,
    uaType: String,
    uaBrand: String,
    uaName: String,
    uaVersion: String,
    uaUrl: String,
    osName: String,
    osVersion: String,
    browserName: String,
    browserVersion: String,
    engineName: String,
    engineVersion: String,
    datetime: String!,
    pageVisit: PageVisit,
  }

  type IpAddress {
    _id: String
    pageVisitId: String!,
    status: String,
    country: String,
    countryCode: String,
    region: String,
    regionName: String,
    city: String,
    zip: String,
    lat: Float,
    lon: Float,
    timezone: String,
    isp: String,
    org: String,
    as: String,
    query: String,
    pageVisit: PageVisit,
  }

  type Mutation {
    createPageVisit(path: String!, referrer: String, ipAddress: String!): PageVisit
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];
