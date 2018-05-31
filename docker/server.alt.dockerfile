FROM node:8

COPY backend /code
WORKDIR /code
ENV NODE_ENV production

EXPOSE 4242

CMD ["node", "dist/backend/src/server.js"]
