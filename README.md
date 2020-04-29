<!--[![Build Status](https://travis-ci.org/tsmean/tsmean.svg?branch=master)](https://travis-ci.org/tsmean/tsmean)-->

# Disclaimer

**Nobody is actively developing tsmean. This means that it's not recommended to use this as a starting point for new applications anymore. You can let yourself be inspired by the project, but don't fork it for your new projects.**

<hr>

![tsmean logo](https://s3.eu-central-1.amazonaws.com/bersling/images/tsmean-logo.png)

This is a **starter kit** for webapps **completely written in TypeScript**.

The starter kit is using the following technologies:

- **M**ySQL
- **E**xpressJS
- **A**ngular 6
- **N**odeJs

... and that's why it's called tsmean! We've carefully elected those technologies to be the best suit for building web apps with TypeScript. You get to use TypeScript now
on the client **and** the server! This leads to efficiency
through consistency. Read more about it here: www.tsmean.com.

# Installation

## Prerequisits ##

- node (v6, v8 or v10) and npm
- git
- angular-cli (see https://github.com/angular/angular-cli)
- Docker (optional)

## Install ##

### Cloning the project
```
git clone https://github.com/tsmean/tsmean your-project-name
cd your-project-name
```

### Setting up the database

The easiest way to set up the MySQL database is to use docker and run:
```
docker run -p 3306:3306 --name mysql tsmean/mysql:2
```
This spins up a docker container with a MySQL instance that has matching settings with the backend. [Read more about the "MySQL in docker" option here](./docker/mysql/docker-mysql.readme.md). You can also set up MySQL directly on your system and create the databases with settings like you find them in `backend/properties/development.properties` and `backend/properties/test.properties` manually. Of course, you can also change the settings you find there to match your needs (for example setting a different user or password or database name).


### Installing all node modules
```
npm install
```

Under the hood [lerna](https://github.com/lerna/lerna) is used to install the multiple packages in backend, frontend and shared, but you don't need to be concerned with this too much for now.

# Backend

First `cd backend`, then:

- to spin up a REST-API server `npm start`. Check it out at http://localhost:4242
- To run the tests `npm test`


# Frontend
First `cd frontend`, then:

- to start the Angular app `npm start`. Check it out on http://localhost:4200
- you can develop all modules independently. For example, `cd src/app/user` and run `ng serve`.
This launches a minimal app only displaying the user module (i.e. without login etc).
You can test all modules using `ng test`.

More info available in [frontend docs](./frontend/README.md).

# Live Demo
https://demo.tsmean.com

[![screenshot](https://s3.eu-central-1.amazonaws.com/bersling/images/animals3.gif)](https://demo.tsmean.com)


# Homepage
http://www.tsmean.com
