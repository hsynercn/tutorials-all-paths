# [NEW] Spring Boot 3 Spring 6 and Hibernate for Beginners

## Section 2: NEW - Spring Core

### 33. What is Inversion of Control

Inversion of Control: The approach of outsourcing the construction and management of objects.

Spring Container

The Spring container is responsible for instantiating, configuring and assembling objects.

For example my app will request a "Coach" object and the Spring container will provide the "Coach".

Spring Container Primary Functions:

- Create and manage objects (Inversion of Control)
- Inject object dependencies (Dependency Injection)

Configuring Spring Container

- XML configuration file (legacy) we will not use this
- Java Annotations (modern)
- Java Source Code (modern)

### 34. Defining Dependency Injection - Overview - Part 1

Dependency Injection

The dependency inversion principle. The client delegates the another the responsibility of providing its dependencies.

Spring Container

Give me a assembled "Coach" object with all dependencies injected.

Some helper objects (dependencies):

- Give me a "Coach" object
  - CricketCoach
  - HockeyCoach
  - BaseballCoach

Injection Types: There are multiple types of injection with Spring

- Constructor Injection
  - Use this when you have required dependencies
  - Generally recommended by the Spring team
- Setter Injection
  - Use this when you have optional dependencies
  - If dependency is not provided, your app can provide reasonable default logic

What is Spring AutoWiring?

Spring will look for a class that matches , matches by class of interface. Spring will inject it automatically.

AutoWiring Example

- Inject a Coach implementation
- Spring will scan for @Components
- Any ıne implements the Coach interface?
- If so, let's inject it, for example: CricketCoach


