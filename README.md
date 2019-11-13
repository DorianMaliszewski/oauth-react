# Spring Boot authorization server with React front end

## Overview

Little project with an oauth2 authorization server with react app.

### Oauth Clients

- Password / Refresh_token grant_type:
  - clientId: test
  - clientSecret: test
  - grant types : password, refresh_token
  - scopes: ROLE_ADMIN, ROLE_USER
  - authorities: ROLE_ADMIN, ROLE_USER

### Users

- ROLE_ADMIN user: 
  - username: admin
  - password: test
- ROLE_USER user: 
  - username: user
  - password: test

## Quick installation

### Without Docker

- If you have the JDK11 installed and yarn you can run `./install.sh`

### With Docker and Docker-compose (Install + Launch)

- If you have the JDK11 installed and yarn
- Make sure port 80 and 8080 are available
- Change in `client/.env.production` localhost by your ip address with port 8080 (exemple: http://192.168.1.25:8080)
- Run `./quick-start-docker.sh`
- Go to http://localhost

---

## Authorization server

### Before

- Make sure you have the JDK11 installed (Openjdk is good)
- If you want to use docker deployment, make sure you have Docker et docker-compose installed
  
### Deploy without docker

- Make sure you have a MariaDB or MySQL databse running with a new database
- Change in `auth/src/main/rsources/application.yml` the datasource url with your needs
- You can modify the port of the authorization server in the same file
- Launch the authorization server with `cd auth && ./mvnw spring-boot:run`

### Deploy with docker

- Launch `cd auth && make build-image`
- Change in `auth/src/main/resources/application.yml` the datasource url with your needs
- Now you have a docker image : `authorization-server`

#### Embedded mariadb database

- Go to `auth/src/main/docker`
- Modify `docker-compose.yml` and `.env_file` to fit your need (to testing don't need changes)
- Run `docker-compose up -d` 

#### Without embedded database

- Go to `auth/src/main/docker`
- Modify `.env_file` to fit your needs
- Run `docker run --env-file ./.env_file -d --name spring-boot-authorization-server authorization-server`  

---

## React App

### Before

- Install nodejs with npm
- Install yarn : `npm -g yarn`

### Deploy

- Install dependencies : `cd client && yarn install`
- If you modified the port, modify it in `client/.env.development`
- Launch application : `yarn start`