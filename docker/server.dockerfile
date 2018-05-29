# Run this from root of project (tsmean)
FROM node:8

COPY . /code

# Setup all modules
WORKDIR /code/backend
RUN npm install

WORKDIR /code/backend
RUN npm run build:prod
ENV NODE_ENV production

EXPOSE 4242

CMD ["npm", "run", "start:prod"]
