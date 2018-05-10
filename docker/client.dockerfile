# Deprecated: directly done from the .travis.yml for simplicity

## Run this from root of project (tsmean)
#FROM node:8
#
#COPY . /code
#
## Setup Shared
#WORKDIR /code/shared
#RUN npm install
#
## Setup Frontend
#WORKDIR /code/frontend
#RUN npm install
#RUN npm run build:prod
