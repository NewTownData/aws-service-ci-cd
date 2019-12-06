FROM node:12-alpine
ARG BUILD_VERSION
ENV BUILD_VERSION ${BUILD_VERSION}
COPY *.json entrypoint.sh /app/
COPY bin/*.ts /app/bin/
COPY lib/*.ts /app/lib/
COPY test/*.ts /app/test/
WORKDIR /app
ENTRYPOINT [ "./entrypoint.sh" ]
