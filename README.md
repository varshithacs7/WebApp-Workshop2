# NestJS Workshop
Workshop on understanding NestJS framework for building efficient, scalable Node.js server-side applications with Micro-Service Architecture. Nest fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

> **Info:**
> You can refer NestJS [doc](https://docs.nestjs.com/) to learn more about the framework.

## Prerequisite

### Prerequisite from **Workshop1** are required
   1. Ubuntu 22.04 LTS Linux machine
   2. Git and GitHub account configured with SSH key
   3. Docker and Docker Compose.
   4. If anything is missing please check the Prerequisite of Workshop1. [click here](https://github.com/UniCourt/WebApp-Workshop1/blob/main/README.md)

### GitHub
   1. Fork the [current](https://github.com/UniCourt/WebApp-Workshop2) repository.
   2. Clone your forked repository inside the `WORKSHOP` directory which was created during Workshop1.

### Docker
   1. Download the follwing docker images to your local machine
      -  ```
         docker pull node:18.16.0-alpine3.17
         ```
         -  Verify the image is pulled into your local machine
            ``` 
            docker run --rm -ti node:18.16.0-alpine3.17 node -v
            ```
            Output: **v18.16.0**
      -  ```
         docker pull postgres:14
         ```
         -  Verify the image
            ```
            docker run --rm -ti postgres:14  psql -V
            ```
            Output: **psql (PostgreSQL) 14.5**
      -  ```
         docker pull dpage/pgadmin4
         ```
   2. Build all the docker images mentioned in `docker-compose` file. Follow the below steps.
      -  Build all the docker images by runningthe below command.
         ```
         docker-compose build
         ```
      -  Verify if all the containers start after the build is completed by running the below command.
         ```
         docker-compose up
         ```

### Postman Installation
   1. Postman app is **required** to use the *API Collection* for testing the API's during the development.
      -  [Install Postman](https://www.postman.com/downloads/)

## What will you learn by the end of this workshop?
- In this workshop you will understand and learn about NestJS framework which is a progressive Node.js framework used for building scalable server-side applications.
- You will know the concepts of Micro-Service.
- Build an Blog application API's for frontend using NestJS.

## **Schedule**
| Time                    |   Topics
| --                      |   --
| 09:00 - 10:15           |  NestJS Controller Working
| 10:15 - 10:30           |  [ `Tea Break` ]
| 10:30 - 01:00           |  NestJS Micro-Service Working
| 1:00  - 2:00            |  [ `Break` ]
| 2:00  - 5:00            |  NestJS Micro-Service Working