FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY target/contract-service-0.0.1-SNAPSHOT.jar contract.jar

EXPOSE 8070

ENTRYPOINT ["java", "-jar", "contract.jar"]