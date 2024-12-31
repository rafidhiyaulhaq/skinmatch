FROM node:18-alpine

WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev

FROM node:18-alpine
WORKDIR /app
COPY --from=0 /app/node_modules ./node_modules
COPY server/ .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080
CMD ["node", "index.js"]