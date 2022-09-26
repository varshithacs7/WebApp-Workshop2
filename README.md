## NodeJS workshop

One Day workshop on understanding the Nestjs framework and to build the basic CRUD operation with postgres database.

## Prerequisite
1. Basic knowledge of docker and docker-compose
2. Basics of express-app
   1. Which is covered in [Workshop 1](https://github.com/UniCourt/WebApp-Workshop1) <span style="color:gray">Go through this repo if you haven't completed it</span>
3. preferred Tools:
   1. IDE: VS Code - [Download Link](https://linuxize.com/post/how-to-install-visual-studio-code-on-ubuntu-20-04/)
   <br><span style="color:green">Note: Install using apt </span>
   3. API client for REST : **Insomnia** - [Download link](https://insomnia.rest/download)
   
### Github - respository clone
1. Fork [Workshop2](https://github.com/UniCourt/WebApp-Workshop2) repository into your account.
2. Clone repo into your local machine run the follwing commands
   1. Create a folder `GITHUB` 
   ```
   $ mkdir GITHUB
   $ cd GITHUB
   ```
   2. Clone your repository 
   ```
   $ git clone git@github.com:<your-username>/WebApp-Workshop2.git
   ```
   <span style="color:red">Note</span> WebApp-Workhop2 folder is created. 
   ```
   $ cd WebApp-Workshop2
   ```
   1. Add upstream
   ```
   $ git remote add upstream git@github.com:UniCourt/WebApp-Workshop2.git
   ```
   1. Create a branch called `dev` in your local
   ```
   $ git fetch --all
   $ git checkout -b dev upstream/main
   ```

### NestJS - Application setup with Docker
1. Open terminal and naviagte to `/GITHUB/WebApp-Workshop2/`
2. Build the docker images
   ```
   $ docker-compose build --no-cache
   ```
3. Setup Postgres
   1. Bring up the Postgres docker service
   ```
   $ docker-compose up -d service-workshop-postgres
   ```
   2. Import database schema
   ```
   $ docker exec -i workshop-postgres psql -h localhost -U workshop_user -d nest_app < database/master.sql
   ```
   3. You should get a message `CREATE TABLE`
   4. Verify by logging into the database
   ```
   $ docker exec -ti workshop-postgres psql -h localhost -U workshop_user -d nest_app

   nest_app=# \d
   ```
   5. <span style="color:red">Note: </span> The command `\d` will list all the relations.
4. Bring up the NestJS Application
5. Open new tab in the terminal `/GITHUB/WebApp-Workshop2/`
6. Bring up the NestJS and Postgres application using docker-compose
   ```
   $ docker-compose up -d
   ```
7. Execute into NestJS container to run the server
   ```
   $ docker exec -ti workshop-nestjs /bin/sh

   /app # npm run start:dev
   ```
8. Open http://localhost:3000 on your browser
9. You will get a message
   <h3><span style="color:green;">Hello from NESTJS <3</h3>

10. To close the application open new tab in the terminal `/GITHUB/WebApp-Workshop2/`
    ```
    $ docker-compose down
    ```

## What will you learn by the end of this workshop?
- By the end of this workshop you will understand Nest framework structure.
- Controller, Module and Service in NesjJS
- Connection to Database
- Basic CRUD operation with NestJS