# Running MySQL in Docker

Docker is very handy to quickly spin up a MySQL database without even having MySQL installed on your system.

All you have to do is to run:
```
docker run -p 3306:3306 --name mysql tsmean/mysql:2
```
This spins up a docker [**container**](https://docs.docker.com/get-started/part2/#introduction). What's happening here is the following:
- We're calling the `docker` "program"
- We're telling docker to start a container with the [`run` command](https://docs.docker.com/engine/reference/run/).
- We're adding options to the docker container:
  - `-p portOnHost:portOnDocker`: Since a docker container is similar to a virtual machine in that it is isolated from your system, in order to access a container you need to first "punch some holes" into the container. For example, you'll want to map the ports relevant to MySQL, so you can access the dockerized MySQL instance from your local machine.
  - `--name mysql`: Give your container a name. Makes it easier to later operate on it, for example for stopping with `docker stop mysql`. Here, "mysql" could be any name.
- `tsmean/mysql:2`: `tsmean/mysql` is the name of the [image](https://docs.docker.com/get-started/part2/#introduction) we're using. An image is like a template to spin up containers. The string (or number) after the colon represents the image tag, meaning which specific version of an image we'd like to use.

If you're new to docker, I'm sure that this still is not enough information for you to fully understand what's happening. For our purposes, you currently don't need a much deeper understanding, because we just use docker to start and stop our database and it's okay if it's a little magic. But in the long run, it's probably a useful skill if you get somewhat familiar with docker anyways! Here's a video tutorial to get you started: https://www.youtube.com/watch?v=gSdm1ghBYJ4. Or just jump into the docs at https://docs.docker.com/get-started/.

Anyways, here are some more useful commands:

To stop the container, run:
```
docker stop mysql
```
The next time, you can simply start with
```
docker start mysql
```

To remove the container, run
```
docker rm mysql
```
This could be useful, if you want to clean up your system or want to spin up a container with different settings (e.g. different port mapping) but with the same name.

To start the container in the background, add the `-d` flag:
```
docker start -d mysql
```

