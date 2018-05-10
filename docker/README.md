# Deployment

Deployment is done via docker swarm.

Docker Swarm helps you to scale your application.

## .dockerfile extension
Usually Dockerfiles are just named "Dockerfile", but that means you can just have one of them in a directory. I find it more practical to name them <name>.dockerfile, that way it's also easier to search for them in the IDE.

## Monolithic vs Service Oriented Deployment

You have two possibilities when it comes to deploying.

1) Monolithic: You build the frontend, then serve the built frontend through the backend via Express. Then the frontend requests resources from the backend like this: `/api/...`.
2) As Services: You treat frontend / backend more separated, with separated deployment processes. Then the frontend retrieves resources like this: `www.backend.com/api/...`.

What are respective advantages?

Advantages of combining them:
- No worrying about versioning. It can't happen that you deploy a backend that is incompatible with your frontend or vice versa.
- You only have to worry about one "service" (your application), you don't need to coordinate a more complex deployment

Separating them:
- You have a higher separation of concerns. This implies for example, that you don't need additional routing rules to separate frontend from backend. Otherwise you'll have to implement some kind of logic like "if `/api/<anything>` then serve backend, else serve index.html`. But it's not too complicated to set up this logic.
- You can guarantee higher availability for the frontend.
- Scales well: You can also divide the backend further into individual microservices, then you'll need a process to orchestrate anyways

In this project, I will go with the approach of deploying two separate services. However, I'll not set up a too complicated deployment process, that exactly coordinates that the deployment.
