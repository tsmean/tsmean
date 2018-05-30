# Run this from root of project (tsmean)
FROM tsmean/clientbase:1

COPY . /code
WORKDIR /code

# Setup all modules
RUN npm install --unsafe-perm

WORKDIR /code/frontend
RUN npm run build:prod
