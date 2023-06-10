FROM node:16
WORKDIR /app
COPY *.json ./
RUN npm ci
COPY *.js ./
ENTRYPOINT ["node", "app.js"]
