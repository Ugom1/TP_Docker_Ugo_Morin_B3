# --- Stage 1: Base (commune) ---
FROM node:20-slim AS base
WORKDIR /app
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
COPY package*.json ./

# --- Stage 2: Development ---
FROM base AS development
RUN npm install
COPY . .
USER nodejs
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Stage 3: Production ---
FROM base AS production
RUN npm ci --only=production
COPY src ./src
USER nodejs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node src/healthcheck.js || exit 1
CMD ["node", "src/server.js"]