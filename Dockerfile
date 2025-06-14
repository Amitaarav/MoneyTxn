FROM node:24-alpine3.21

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Generate prisma client
RUN npm run db:generate

# Build
RUN npm run build

CMD ["npm", "run", "start:user-app"]



