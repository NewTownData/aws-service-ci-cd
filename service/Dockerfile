FROM node:12
COPY package.json /app/
COPY package-lock.json /app/
COPY index.js /app/
RUN npm install
WORKDIR /app
ENTRYPOINT [ "node", "index.js" ]
