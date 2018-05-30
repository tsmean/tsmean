# Run this from root of project (tsmean)
FROM node:8

COPY . /code
WORKDIR /code

# Setup all modules
RUN npm install --unsafe-perm

WORKDIR /code/backend
RUN npm run build:prod
ENV NODE_ENV production

EXPOSE 4242

CMD ["npm", "run", "start:prod"]
