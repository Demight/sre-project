FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

COPY . .

EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s \
  CMD wget -qO- --timeout=2 http://127.0.0.1:3000/healthz || exit 1

CMD ["node", "server.js"]
