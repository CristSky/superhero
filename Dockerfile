FROM node:8 AS build
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
RUN yarn --production

FROM gcr.io/distroless/nodejs:latest
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
ENV NODE_ENV=production
CMD ["server/server.js"]
