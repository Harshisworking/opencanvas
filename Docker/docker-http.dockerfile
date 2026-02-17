FROM node:alpine

WORKDIR /app

COPY .. .

RUN cd /app/apps/http-server && npm install
RUN cd /app/apps/ws-server && npm install
RUN cd /app/apps/http-server && npm install
RUN cd /app/packages/db && npx prisma generate


EXPOSE 3000

CMD ["npm", "run", "dev"]
