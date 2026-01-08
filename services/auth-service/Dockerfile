FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
COPY . .

ENV PORT=8080
EXPOSE 8080

COPY gradle/wrapper/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
