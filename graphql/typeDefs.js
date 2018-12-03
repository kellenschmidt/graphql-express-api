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
    userId: Int
    path: String
    referrer: String
    userAgent: UserAgent
    ipAddress: IpAddress
  }

  type UserAgent {
    _id: String
    pageVisitId: String!
    userAgent: String!,
    software: String,
    softwareName: String,
    softwareNameCode: String,
    softwareVersion: String,
    softwareVersionFull: [String],
    simpleSoftwareString: String,
    simpleOperatingPlatformString: String,
    operatingSystem: String,
    operatingSystemName: String,
    operatingSystemVersion: String,
    operatingSystemVersionFull: [String],
    operatingSystemNameCode: String,
    status: String,
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
    createPageVisit(userId: Int, path: String!, referrer: String, ipAddress: String!): PageVisit
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];
