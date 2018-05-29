# Run this from root of project (tsmean)
FROM tsmean/clientbase:1

COPY . /code
WORKDIR /code

# Setup all modules
RUN npm install

WORKDIR /code/frontend
ENV NODE_ENV production
RUN npm run build:prod
