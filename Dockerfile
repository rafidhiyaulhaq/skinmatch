FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ .

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "index.js"]