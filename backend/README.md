This is the backend of **tsmean**.

# Installation

```
cd shared
npm install
cd ../backend
npm install
```


# Run
For getting started, simply run:
```
npm start
```
By default, a server at port 4242 (localhost:4242) is started. It launches the server in dev mode, so when you change files, it will automatically restart the app.

When you first run this project, it will connect to a public remote MySQL instance to get you started quickly. However, in order to really work on the backend (changing the schema etc.) you should set up a local MySQL database. The easiest way to do so is by using the docker image we provide:
```
docker run -p 3306:3306 --name mysql tsmean/mysql:1
```
Then, in a separate terminal window, run:
```
npm run start:local
```
To stop the db, run:
```
docker stop mysql && docker rm mysql
```

# Test
```
npm test
```

Note: If you're using an IDE such as IntelliJ, you can also run single files
directly from the IDE! See https://www.jetbrains.com/help/idea/2017.1/run-debug-configuration-mocha.html


# See it in action
The backend is hosted at https://demoserver.tsmean.com.
