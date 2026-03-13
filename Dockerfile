FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install --no-frozen-lockfile

WORKDIR /app/apps/api
RUN pnpm build

CMD ["pnpm", "start"]
