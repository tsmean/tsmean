# docker build -t tsmean/mysql:1 .
FROM mysql:5
ENV MYSQL_DATABASE local_tsmean
ENV MYSQL_ROOT_PASSWORD 1234
COPY init-db.sql /docker-entrypoint-initdb.d/
