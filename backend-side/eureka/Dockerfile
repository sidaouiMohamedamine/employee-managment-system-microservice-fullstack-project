FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY target/eureka-0.0.1-SNAPSHOT.jar eureka.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "eureka.jar"]