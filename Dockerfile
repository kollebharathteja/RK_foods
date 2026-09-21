# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy backend directory
COPY backend/ ./backend/

# Build the application from backend directory
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the jar file from build stage
COPY --from=build /app/backend/target/*.jar app.jar

# Create uploads directory
RUN mkdir -p /app/uploads/products && \
    mkdir -p /app/uploads/payments

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
