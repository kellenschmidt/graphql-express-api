# graphql-express-api

[![CircleCI](https://circleci.com/gh/kellenschmidt/graphql-express-api.svg?style=svg)](https://circleci.com/gh/kellenschmidt/graphql-express-api)

Log in with `mongo --host localhost -u mongoadmin -p secret --authenticationDatabase admin admin`

```
db.createUser(
  {
    user: "kellen",
    pwd: "password",
    roles: [ { role: "readWrite", db: "test" }, { role: "readWrite", db: "admin" } ]
  }
);
```

`curl -X POST -H "Content-Type: application/json" -d '{"query": "{ userAgent(id: \"5b661e1e94e95a84ea415a57\") { userAgent uaType uaBrand } }"}' http://localhost:3000/graphql`
