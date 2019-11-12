#!/bin/bash
echo "
Deploying the authorization server to the docker registry
"

docker tag authorization-server myrepo/spring-boot-authorization-server

docker push myrepo/spring-boot-authorization-server