const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const routes = require('./routes/routes');

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(routes);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

const specOptions = {
  definition: {
    info: {
      title: 'User Interaction Tracking API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/routes.js'],
};
const swaggerSpec = swaggerJSDoc(specOptions);
const uiOptions = {
  explorer: true,
}
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));

mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
