FROM node:12-alpine
ARG BUILD_VERSION
ENV BUILD_VERSION ${BUILD_VERSION}
COPY package.json /app/
COPY package-lock.json /app/
COPY index.js /app/
WORKDIR /app
RUN npm install
ENTRYPOINT [ "node", "index.js" ]
