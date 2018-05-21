This is the backend of **tsmean**.

# Installation

```
cd shared
npm install
cd ../backend
npm install
```

## Configuration
When you first run this project,
it will connect to a public remote MySQL instance 
I have setup so this project can be run with minimal overhead.
However, I advise you to change the properties data with your own credentials
in `<project>/properties/development.properties.json` and `<project>/properties/test.properties.json`,
since the remote MySQL instance is cleaned on a regular basis.

You can find out more about the `properties` files in [properties docs](./properties/README.md).

# Run
```
npm start
```
By default, a server at port 4242 (localhost:4242) is started.

For development we recommend you to run:
```
npm run dev
```
It launches the server in dev mode, so when you change files,
it will automatically restart the app.

# Test
```
npm test
```

Note: If you're using an IDE such as IntelliJ, you can also run single files
directly from the IDE! See https://www.jetbrains.com/help/idea/2017.1/run-debug-configuration-mocha.html


# See it in action
The backend is hosted at https://demoserver.tsmean.com.
