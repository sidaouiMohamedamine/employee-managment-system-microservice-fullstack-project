FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY target/staff-service-0.0.1-SNAPSHOT.jar staff.jar

EXPOSE 8060

ENTRYPOINT ["java", "-jar", "staff.jar"]