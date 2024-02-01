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


