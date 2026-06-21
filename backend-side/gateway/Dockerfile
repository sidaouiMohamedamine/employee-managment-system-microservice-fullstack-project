FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY target/gateway-0.0.1-SNAPSHOT.jar gateway.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "gateway.jar"]