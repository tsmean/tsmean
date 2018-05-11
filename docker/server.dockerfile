# Run this from root of project (tsmean)
FROM node:8

COPY . /code

# Setup Shared
WORKDIR /code/shared
RUN npm install

# Setup Backend
WORKDIR /code/backend
RUN npm install
RUN npm run build:prod
ENV NODE_ENV production

EXPOSE 4242

CMD ["npm", "run", "start:prod"]
