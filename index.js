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

const specOptions = {
  definition: {
    info: {
      title: 'User Interaction Tracking API',
      version: version,
    },
  },
  apis: ['./routes/routes.js'],
};
const swaggerSpec = swaggerJSDoc(specOptions);
const uiOptions = {
  explorer: true,
}
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017`);
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
