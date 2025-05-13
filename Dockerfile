# Stage 1: Build
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20

WORKDIR /app

COPY package*.json ./
COPY .sequelizerc ./
COPY src/modules/postgres/migrations ./src/modules/postgres/migrations
COPY src/config/database.config.js ./src/config/

RUN npm ci --omit=development

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]
