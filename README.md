# graphql-express-api

[![CircleCI](https://circleci.com/gh/kellenschmidt/graphql-express-api.svg?style=svg)](https://circleci.com/gh/kellenschmidt/graphql-express-api)

## Run locally

### Create mongo database

Start local mongodb: `docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.0`

Log in: `mongo --host localhost -u mongoadmin -p secret --authenticationDatabase admin admin`

Create mongo user:

```javascript
db.createUser(
  {
    user: "kellen",
    pwd: "password",
    roles: [ { role: "readWrite", db: "test" }, { role: "readWrite", db: "admin" } ]
  }
);
```

### Start api server

Start express: `npm start`

## Other

`curl -X POST -H "Content-Type: application/json" -d '{"query": "{ userAgent(id: \"5b661e1e94e95a84ea415a57\") { userAgent uaType uaBrand } }"}' http://localhost:3000/graphql`
 