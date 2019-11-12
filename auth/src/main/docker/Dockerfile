# Import the official image of docker java
FROM openjdk:11.0.1

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    TIME_TO_SLEEP=0 \
    JAVA_OPTS="" \
    SPRING_DATASOURCE_URL="" \
    SPRING_DATASOURCE_USER="" \
    SPRING_DATASOURCE_PASSWORD="" \
    BASE_URL=""

ADD *.jar /app.jar

EXPOSE 8080

CMD echo "The application will start in ${TIME_TO_SLEEP}s..." && \
    sleep ${TIME_TO_SLEEP} && \
    java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.jar \
       --spring.datasource.url="${SPRING_DATASOURCE_URL}" \
       --spring.datasource.username="${SPRING_DATASOURCE_USERNAME}" \
       --spring.datasource.password="${SPRING_DATASOURCE_PASSWORD}" \
       --base-url="${BASE_URL}" \
       --server.port=8080
