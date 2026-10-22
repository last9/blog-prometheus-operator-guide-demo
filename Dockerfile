FROM node:24.22.1@sha256:5630d96570d4ca4a8523fda3d169d0114554d0f48293e1ae3db6be7c79b42a17
WORKDIR /app
COPY *.json ./
RUN npm ci
COPY *.js ./
ENTRYPOINT ["node", "app.js"]
