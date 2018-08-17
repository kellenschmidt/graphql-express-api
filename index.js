const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(routes);

const isDev = process.env.NODE_ENV === 'production' ? false : true;
const port = process.env.EXPRESS_PORT || 3000;
const routePrefix = '/api/v2';

if (isDev) {
  dotenv.load();
  app.use(cors());
}

let version;
try {
  version = require('./app-version');
} catch(err) {
  version = '0.0.0';
}

app.use('/graphql', graphqlHTTP(request => ({
  schema: schema,
  graphiql: isDev,
  context: {
    request
  }
})));

let title = 'User Interaction Tracking API';
const specOptions = {
  definition: {
    info: {
      title: title,
      // description: "API to ",
      version: version,
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
    },
  },
  apis: ['./routes/routes.js'],
};
const swaggerSpec = swaggerJSDoc(specOptions);
const uiOptions = {
  explorer: true,
}
app.use(routePrefix, swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));

mongoose.connect(`mongodb://${encodeURIComponent(process.env.MONGO_USER)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${encodeURIComponent(process.env.MONGO_HOST)}:27017/${encodeURIComponent(process.env.MONGO_DATABASE)}`, { useNewUrlParser: true }).then(
  () => { console.log("Connected to MongoDB") },
  (err) => {
    console.log(err);
    console.log(`Connection string: mongodb://${encodeURIComponent(process.env.MONGO_USER)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${encodeURIComponent(process.env.MONGO_HOST)}:27017/${encodeURIComponent(process.env.MONGO_DATABASE)}`);
  }
);

app.listen(port, () => console.log(`${title} listening on port ${port}!`));
