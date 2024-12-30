FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm ci --omit=dev

COPY server/ .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]