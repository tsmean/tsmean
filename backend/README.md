[![Build Status](https://travis-ci.org/tsmean/backend.svg?branch=master)](https://travis-ci.org/tsmean/backend)

# Foreword

This is the backend for the TSMEAN stack.
I have expanded the definition of the "M" in MEAN,
to mean either "Mongo" or "MySQL". The backend has
an implementation for both databases. Which one is used
is determined in `properties/..properties.json` file as the
type property, default is Mongo.

The backend is built in a fully modular manner. Currently there are:

- Mongo Module (independent)
- MySQL Module (independent)
- Db-Adapter Module (builds on mongo and mysql modules)
- Auth Module (builds on db-adapter module)
- Router Module (builds on auth-module and db-adapter module)
- Main Module (straps everything together)

The modules are packaged via npm and access each other via the
npm registry.


# Installation

## Prerequisits

- node (v6 or v8) & npm (v3 or v5)
- git
- ts-node (`npm install -g ts-node`)

## Setup
```
git clone https://github.com/tsmean/backend.git project-name-backend
cd project-name-backend
npm install
```

This will execute `install.sh`.
You need to have git, npm and yarn installed to make this work and
it will only work on linux / mac.

# Run
Make sure you have typescript installed, then run:
```
npm start
```
By default, a server at port 4242 (localhost:4242) is started.

# Test
```
npm test
```

You can also run the tests of the modules independently by
`cd module-name` and `npm test`.

Note: If you're using an IDE such as IntelliJ, you can also run single files
directly from the IDE! See https://www.jetbrains.com/help/idea/2017.1/run-debug-configuration-mocha.html


# Development

As mentioned, the seed has a modular design and the modules access each
other via npm. You have now two options: 1) Switch out all the absolute
package references with relative references. 2) Follow the same pattern
with publish / pull on npm. To do so, I would recommend that you register an
organization on npm (could be `yourname`) and switch out `@tsmean`
with `@yourorganizationname` in the package.json in all modules.
Like this you can follow the same highly modular development principles.

If you go for publishing to npm, here's the workflow:

1. make your changes
2. git commit and push them
3. `npm version patch` / minor / major according to semvar
4. `yarn upgrade` in the modules where you need the updates.

I know it's a bit of an overhead compared to writing
everything with references, but modularity is such a key
concept, that I think you will thank me later!

# Deployment

I have configured a small `deploy.sh` script
(doing it with typescript was horrible, so I switched back to a good old shell script).
That way you should be able to deploy on any remote (ubuntu) instance easily.
Just change the `server` variable in the script
and run
`./deploy.sh` or `./deploy.sh test` for a dry run
executing all unit tests reomtely.


# See it in action

You can test the interface at http://demo.tsmean.com:4242, e.g.
http://demo.tsmean.com:4242/api/v1/heroes.



# Database
When you first run this project,
it will connect to a remote Mongo instance I have setup so this project can be run with minimal overhead.
However, I advise you to create your own `<project>/properties/local.properties.json`
and `<project>/properties/test.properties.json`,
since the remote mongo instance is cleaned on a regular basis.
