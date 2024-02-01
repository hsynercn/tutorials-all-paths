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

### 6. Spring Boot Initializr Demo

- Quickly create a starter Spring project
- Select your dependencies
- Creates a  Maven/Gradle project
- Import the project into your IDE: IntelliJ, Eclipse, etc.

Maven Solution

- Tell maven the dependencies you need
- Maven will go out and download the JAR files for these projects
- And Maven will make those JAR files available to your project

We can create a Spring Boot project using the Spring Initializr website [link](https://start.spring.io/).

We will add the Spring Web dependency.

After downloading the zip file, we can import the project into IntelliJ as a Maven project. After this step IntelliJ will download the dependencies.

Lastly we can run the project from the application class.

### 7. Spring Boot - Create a REST Controller

We will create a hello world REST controller.

```java
@RestController
public class FunRestController {

    @GetMapping("/")
    public String sayHello() {
        return "Hello World! Time on server is " + LocalDateTime.now();
    }
}
```

### 8. Spring Framework Overview - Part 1

- Lightweight development with Java POJOs (Plain Old Java Objects)
- Dependency Injection to promote loose coupling
- Minimize boilerplate Java code

Core Container

- Factory for creating beans
- Manage bean dependencies
- Items: Beans, Core, SpEL, Context

Infrastructure

- AOP: Aspect Oriented Programming
- Add functionality to objects declaratively
- Logging, transactions, security, etc.
- Items: AOP, Aspects, Instrumentation, Messaging

Data Access Layer

- This is for communicating with the database
- JDBC helper classes, reduce your JDBC code by 50%
- ORM, integration with Hibernate, JPA, etc.
- JMS, Java Messaging Service, for sending async messages to a message broker
- Transactions, add transaction support to your code
- Web, all web related stuff, servlets , web sockets, web etc.
- Items: JDBC, ORM, Transactions, OXM, JMS

### 9. Spring Framework Overview - Part 2

Infrastructure

- Java agents, for monitoring and profiling, JMX (Java Management Extensions)
- Items: AOP, Aspects, Instrumentation, Messaging

Test Layer

- Supports Test Driven Development (TDD)
- Mock objects and out-of-container testing
- Items: Unit, Integration, Mock

### 10. Spring Projects

- Additional Spring modules built on top of the core Spring Framework
- Only use the required
  - Spring Cloud, Spring Data
  - Spring Batch, Spring Security
  - Spring Web Services, Spring LDAP

### 11. What is Maven?

- When you generate projects using Spring Initializr, it can generate a Maven project for you
- This section will mention
  - Viewing dependencies in the Maven pom.xml file
  - Spring Boot Starters for Maven

Maven is a project management tool, the most popular use of maven is for build management and dependencies.

Without Maven we should download the dependencies manually and add them to the project. On the other hand, Maven will go out and download the dependencies automatically.

Maven - How it works?

1. Maven reads the project config file
2. Checks the local repo
3. Gets the packages from the remote repo
4. Saves the packages to the local repo
5. Builds and runs the project

When Maven retrieves a project dependency it will also download supporting dependencies.

Standard Directory Structure

- src/main/java: Your Java source code
- src/main/resources: Properties / config files used by your app
- src/main/webapp: JSP files and web config files other web assets (images, css, etc.)
- src/test: Unit test code and properties
- target: Destination directory for compiled code, automatically created by Maven.

IDEs support Maven projects and developers easily share Maven projects between IDEs.

Advantages of Maven

- Dependency management
  - Maven will find JAR files for you
  - No more missing JARs
- Building and Running your Project
  - No more build path/classpath issues
- Standard directory structure

### 13. Maven Key Concepts

POM  File: Project Object Model

Configuration file for your project, located int he root of your Maven project.

pom.xml

- project metadata
- dependencies
- plugins

Project Coordinates are the unique identifier for your project.

- Group ID: Name of company, group, or organization. Convention is to use reverse domain name: com.luv2code
- Artifact ID: Name of the project. Convention is to use lowercase with dashes: spring-boot-demo
- Version: Version of the project. Convention is to use semantic versioning: 1.0.0

Dependency Coordinates

- Group ID
- Artifact ID
- Version is optional, best practice is to include the version

May see this referred as GAV

### 14. Exploring Spring Boot Project Files - Part 1

- src/main/java: Java source code
- src/main/resources: Properties / config files used by your app
- src/test/java: Unit testing source code

Maven Wrapper files

mvnw allows you to run Maven commands without having Maven installed on your system.

- mvnw.cmd is for Windows
- mvnw is for Mac/Linux

POM File

pom.xml includes info that you need to build your project.

Java Source Code

The Java source code is located in the src/main/java directory. Controllers, services, etc.

Application Properties

Created by Spring Initializr, contains properties for your app.

### 15. Exploring Spring Boot Project Files - Part 2

Application Properties

We can use properties files to configure our application.

```java
@RestController
public class FunRestController {
  @Value("${coach.name}")
  private String coachName;

  @Value("${team.name}")
  private String teamName;
}
```

```properties
coach.name=John Doe
team.name=The A Team
```

Static Content

Static content is located in the src/main/resources/static directory. By default, Spring Boot will serve static content from this directory.

Do not use src/main/webapp directory if your application is packaged as a JAR, it works only with WAR packaging. It is silently ignored by most build tools if you generate a JAR.

Templates

Spring boot includes auto-configuration for following template engines:

- FreeMarker
- Thymeleaf
- Mustache

Unit Tests

We can add unit tests to the src/test/java directory.

### 16. Spring Boot Starters

Spring Boot Starters

- A curated list of Maven dependencies
- A collection of dependencies grouped together
- Tested and verified by the Spring Development team
- Makes it much easier to for the developer to get started with Spring
- Reduces the amount of Maven configuration

For example Spring MVC: spring-boot-starter-web

There are 30+ Spring Boot Starters from the Spring Development team.

- spring-boot-starter-web: Build web apps, includes validation, REST. Uses Tomcat as default embedded server.
- spring-boot-starter-security: Adding Spring Security support.
- spring-boot-starter-data-jpa: Spring database support with JPA and Hibernate.

### 17. Spring Boot Parents for Starters

Spring Boot provides a "Starter Parent".

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.5.5</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
```

To override a default, set as a property.

```xml
<properties>
  <java.version>17</java.version>
</properties>
```

### 18. Spring Boot Dev Tools - Overview

Automatically restarts your application when code is updated.

Simply add the dependency yo your POM file.

- For IntelliJ, we need to enable the "Build project automatically" option.
- Allow auto-make to start the build process as soon as changes are made to the project.

![image](https://github.com/hsynercn/tutorials-all-paths/assets/28985966/4404e934-ee48-499a-a322-9d3d13f69cc0)

![image](https://github.com/hsynercn/tutorials-all-paths/assets/28985966/c2b69e1b-5072-4ff9-80e0-6d95bb0ca266)

After this steps we can add the related package to pom.xml.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

### 20. Spring Boot Actuator - Overview

Exposes endpoints for monitoring and managing your Spring Boot application.

REST points are automatically exposed.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

It will enable the "/health" endpoint.

By default, only the health endpoint is exposed.

This /info endpoint is not exposed by default.

```xml
management.endpoints.web.exposure.include=hearth,info
management.info.env.enabled=true
```

We can provide information about application.

```properties
info.app.name=Spring Boot Demo
info.app.description=Spring Boot Demo Project
info.app.version=1.0.0
```

This information will be available on the /info endpoint.

There are 10+ Spring Boot Actuator endpoints.

- /auditevents: Audit events for the current application
- /beans: List of all beans registered in the Spring application context
- /mappings: List of all @RequestMapping paths

### 21. Spring Boot Actuator - Accessing Endpoints - Part 1

We should add the following dependency to pom.xml.

```xml
<!-- ADD SUPPORT FOR SPRING BOOT ACTUATOR -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

We need to add the following properties to application.properties.

```properties
management.endpoints.web.exposure.include=*
management.info.env.enabled=true
```

At this point we cam access the /health endpoint and we can receive a JSON response:

```json
{
  "status": "UP",
}
```

### 22. Spring Boot Actuator - Accessing Endpoints - Part 2

Customize the /info endpoint.

```properties
info.app.name=Spring Boot Demo
info.app.description=Spring Boot Demo Project
info.app.version=1.0.0
```

We can add Chrome extension for JSON formatting.

We can use wildcards to expose all endpoints.

```properties
management.endpoints.web.exposure.include=*
```

### 23. Spring Boot Actuator - Securing Endpoints - Overview

You may not want to expose all endpoints to the public.

We can enable security for the endpoints.

Development Process

1. Edit pom.xml and add spring-boot-starter-security.
2. Verify security on actuator endpoints for /beans.
3. Disable endpoints for /health and /info.

### 24. Spring Boot Actuator - Securing Endpoints - Coding

First we should add the following dependency to pom.xml.

```xml
<!-- ADD SUPPORT FOR SPRING SECURITY -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

After this step we can access the /beans endpoint with username and password. Password can be found in the console.

Still some endpoints are accessible without authentication.

We can disable the /health and /info endpoints.

```properties
management.endpoints.web.exposure.exclude=health,info
```

### 25. Run Spring Boot Apps From Command Line - Overview

We can run the Spring Boot app from the command line.

Since we are using Spring Boot, the server is embedded in our JAR file.

Two options:

- Use "java -jar"
- Use "mvn spring-boot:run"

```bash
java -jas mycoolapp.jar
```

```bash
mvn spring-boot:run
```

### 26. Run Spring Boot Apps From the Command Line - Prep

We will delete some redundant dependencies.

### 27. Run Spring Boot Apps From the Command Line - Microsoft Windows

Open a command prompt and navigate to the project directory.

Check the Java installation.

```bash
java -version
```

Move to the target directory.

```bash
cd target
```

Run the JAR file.

```bash
java -jar spring-boot-demo-0.0.1-SNAPSHOT.jar
```

Also we can run the app with Spring Boot Maven plugin.

```bash
mvnw spring-boot:run
```

### 28. Run Spring Boot Apps From the Command Line - Mac/Linux

Package the app with Maven.

```bash
./mvnw package
```

Run the JAR file.

```bash
java -jar target/spring-boot-demo-0.0.1-SNAPSHOT.jar
```

We can use mnnw to run the app.

```bash
./mvnw spring-boot:run
```

### 29. Injecting Custom Application Properties - Overview

By default Spring Boot reads in properties from the application.properties file.

We can define our own properties on the file.

```properties
coach.name=John Doe
team.name=The A Team
```

We can use @Value annotation to inject properties.

```java
@Value("${coach.name}")
private String coachName;
```

### 30. Injecting Custom Application Properties - Coding

Let's add the following properties to application.properties.

```properties
coach.name=John Doe
team.name=The A Team
```

We can reach the properties with @Value annotation.

```java
@Value("${coach.name}")
private String coachName;

@Value("${team.name}")
private String teamName;

@GetMappin("/teaminfo")
public String getTeamInfo() {
  return "Coach: " + coachName + ", Team: " + teamName;
}
```

We can use these properties in our controller.

### 31. Configuring the Spring Boot Server - Overview

There are 1000+ properties that can be configured.

They are roughly grouped into the following categories:

- Core
- Web
- Security
- Data
- Actuator
- Integration
- DevTools
- Testing

Core Properties

```properties
# Log levels severity mapping
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=ERROR
logging.level.com.luv2code=TRACE

# Log file name
logging.file.name=crazy.log
logging.file.path=/Users/john/logs
```

Web Properties

```properties
# Server port
server.port=8080

# Context path
server.servlet.context-path=/demo

# Session timeout
server.servlet.session.timeout=15m
```

Actuator Properties

```properties
# Enable all endpoints
management.endpoints.web.exposure.include=*

# Enable specific endpoints
management.endpoints.web.exposure.exclude=health,info

# Base path for actuator endpoints
management.endpoints.web.base-path=/actuator
```

Security Properties

```properties
# Default username
spring.security.user.name=admin

# Enable password
spring.security.user.password=topsecret
```

Data Properties

```properties
# JDBC URL of the database
spring.datasource.url=jdbc:mysql://localhost:3306

# Username and password
spring.datasource.username=scott
spring.datasource.password=tiger
```

