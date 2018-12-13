# graphql-express-api

[![CircleCI](https://circleci.com/gh/kellenschmidt/graphql-express-api.svg?style=svg)](https://circleci.com/gh/kellenschmidt/graphql-express-api)

GraphQL API to save and expose user agent and ip address data about page visitors to kellenschmidt.com

## Run locally

### Create mongo database

Start local mongodb: `docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.0`

Exec into container

Log in: `mongo --host localhost -u mongoadmin -p secret --authenticationDatabase admin admin`

Create mongo user:

```javascript
use admin
db.createUser({
  user:  'kellen',
  pwd: 'password',
  roles: [
    { role: "readWrite", db: "test" },
    { role: "readWrite", db: "admin" },
    { role: "readWrite", db: "interactions" },
    { role: "dbAdmin", db: "interactions" }
  ]
})
use interactions
db.helloworld.insert({"hello":"world"})
```

### Delete mongo database

```javascript
use interactions
db.dropDatabase()
```

### Start api server

Start express: `yarn start`

## Resources

### Metrics

- https://engine.apollographql.com/account/gh.kellenschmidt/services

### Links

- https://medium.com/the-ideal-system/graphql-and-mongodb-a-quick-example-34643e637e49
- https://github.com/nmaro/graphql-mongodb-example
