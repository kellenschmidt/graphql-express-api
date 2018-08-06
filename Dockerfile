# docker build -t kellenschmidt/graphql-express-api .
# OR (to include custom app version)
# docker build --build-arg APP_VERSION=v1 -t kellenschmidt/graphql-express-api .
# docker run -p 80:80 -d kellenschmidt/graphql-express-api

FROM node:9-alpine
ARG APP_VERSION
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --silent --prod
COPY . .
RUN yarn run version $APP_VERSION
EXPOSE 80
CMD ["yarn", "start:prod"]
