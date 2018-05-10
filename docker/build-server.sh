#!/bin/bash bash

# run this from root of project
docker build -t tsmean/server -f docker/server.dockerfile .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push tsmean/server
