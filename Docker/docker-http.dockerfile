FROM node:20

# 1. Enable Corepack for Yarn 10.8.2
RUN corepack enable && corepack prepare yarn@10.8.2 --activate

WORKDIR /app

# 2. Copy EVERYTHING (including the root package.json and turbo.json)
COPY . .

# 3. FIX: Install from the ROOT. 
# This links @repo/db to your apps automatically.
RUN yarn install

# 4. Generate Prisma Client
RUN cd packages/db && npx prisma generate

# 5. Build the shared packages so they are ready for the apps
RUN npx turbo run build --filter=@repo/db

EXPOSE 3000 3002 8080

# 6. Start the dev environment using the root command
CMD ["npm", "run", "dev"]