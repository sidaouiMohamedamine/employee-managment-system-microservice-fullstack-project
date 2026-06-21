FROM eclipse-temurin:17-jdk
# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the target directory of the host to the container
COPY target/config-server-0.0.1-SNAPSHOT.jar config-server.jar

# Expose port 8888 for the application
EXPOSE 8888

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "config-server.jar"]