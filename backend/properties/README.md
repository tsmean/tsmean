## Properties Files

The purpose of the `.properties` files is to provide different settings depending on the environment. For example, a different database is used for local development, testing and production. This is reflected in the `.properties` files.

You can customize all files to your needs. A corresponding interface is found in the `app-properties.model.ts`.

Which properties file is used is determined by `config.providers.ts`. The default is `development`, but if a `NODE_ENV` is present, the name of the node env is used. For example, if `process.env.NODE_ENV === test`, then `test.properties.json` is used.

If you add confidential properties, remember to ignore the files from git.
