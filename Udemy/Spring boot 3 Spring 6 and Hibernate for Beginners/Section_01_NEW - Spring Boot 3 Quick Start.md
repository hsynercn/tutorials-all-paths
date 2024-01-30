# [NEW] Spring Boot 3 Spring 6 and Hibernate for Beginners

## Section 1: NEW - Spring Boot 3 Quick Start

### 1. Introduction

- Develop Spring Boot applications
- Leverage Hibernate/JPA for database access
- Develop a ERST API using Spring Boot
- Create a Spring MVC app with Spring Boot
- Connect Spring Boot apps to a Database for CRUD development
- Apply Spring Security to control application access
- Leverage all Java configuration (no XML) and Maven

### 2. How To Take This Course and How To Get Help

Type along with the video.

[GitHub Repository](https://github.com/darbyluv2code/spring-boot-3-spring-6-hibernate-for-beginners)

Check the Q&A section of the course for help.

### 3. Downloading the Source Code, PDFs and Course Links

We can download the zip file or clone the repository.

If you are getting "File Names Too Long" or "Invalid File" errors on Windows, you can use the following command to clone the repository:

```bash
git clone -c core.longpaths=true https://github.com/darbyluv2code/spring-boot-3-spring-6-hibernate-for-beginners.git
```

[GitHub Repository](https://github.com/darbyluv2code/spring-boot-3-spring-6-hibernate-for-beginners)

### 4. Java Development Environment Checkpoint

Experience with Java is required.

- OOP, classes, interfaces, inheritance, exception handling, collections

You should have the following items already installed:

- JDK, Spring Boot 3 requires JDK 17 or higher
- Java IDE (IntelliJ CE, etc.)

### 5. Spring Boot Overview

Spring in a Nutshell

- Very popular framework for building Java applications
- Provides a large number of helper classes and annotations

The Problem

- Building a traditional Java application really hard
- Which JAR dependencies do I need?
- How do I install the server? Tomcat, JBoss, etc.

Spring Boot Solution

- Make it easier to get started with Spring dev
- Minimize the amount of manual configuration
  - Performs auto-configuration based on props files and JAR classpath
- Help to resolve dependency conflicts (Maven or Gradle)
- Provide embedded HTTP server so you can get stared quickly
  - Tomcat, Jetty, Undertow

Spring Boot and Spring

- Spring Boot uses Spring behind the scenes
- Spring Boot simply makes it easier to use Spring

Spring Initializr

- Quick way to create a Spring Boot project
- Select your dependencies
- Creates a maven/Gradle project
- Import the project into your IDE: IntelliJ, Eclipse, etc.

Spring Boot Embedded Server

- Provide an embedded HTTP server
  - Tomcat, Jetty, Undertow
- No need to install a server separately

App jar will contain the app code and the server.

Running Spring Boot Apps

- Spring Boot apps can be run standalone
- We can run app from IDE or command line

```bash
java -jar mycoolapp.jar
```

Deploying Spring Boot Apps

- Spring Boot apps can also be deployed in the traditional way.
- Also we can deploy WAR file to an external server: Tomcat, JBoss, WebSphere

Spring Boot FAQ 1

Does Spring Boot replace Spring MVC, Spring REST etc?

NO. Instead, Spring Boot actually uses those technologies.

Spring Boot FAQ 2

Does Spring Boot run faster than Spring?

No, Spring Boot uses same code of Spring Framework.

Spring Boot FAQ 3

Do we need a special IDE for Spring Boot?

No, we can use any IDE for Spring Boot apps, the Spring team provides free Spring Tool Suite (STS), IDE plugins.


