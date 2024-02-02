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

### 35. Defining Dependency Injection - Overview - Part 2

```mermaid
graph LR
  A[Web Browser] -->|/dailyworkout| B 
  B[Demo Controller] -->|getDailyWorkout| C
  C[Coach] -->|"Practice for 15 minutes"| B
  B -->|"Practice for 15 minutes"| A
```

Development Process

1. Define the dependency interface and class
2. Create a Demo rest Controller
3. Create a constructor in your class for injections
4. Add @GetMapping method to expose the endpoint

Step 1: Define the dependency interface and class

Coach.java
```java
package com.luv2code.springcoredemo;

public interface Coach {
    public String getDailyWorkout();
}
```

CrickeCoach.java
```java
package com.luv2code.springcoredemo;

import org.springframework.stereotype.Component;

@Component
public class CricketCoach implements Coach {
    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 minutes";
    }
}
```

@Componenet annotation:

- Marks the class as a Spring Bean.
- makes the bean available for dependency injection.

DemoController.java
```java
package com.luv2code.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestContoller
public class DemoController {
    private Coach myCoach;

    @Autowired
    public DemoController(Coach theCoach) {
        myCoach = theCoach;
    }

    @GetMapping("/dailyworkout")
    public String getDailyWorkout() {
        return myCoach.getDailyWorkout();
    }
}
```

If you have only one constructor, @Autowired is optional.

### 36. Constructor Injection - Coding - Part 1

This part is about some file copy paste. I will not write it here.

### 37. Constructor Injection - Coding - Part 2

@Component annotation is used to mark the class as a Spring Bean, it makes the bean available for dependency injection.

### 38. IDE Warning - No Usages

Spring is dynamically injecting the dependency. So, the IDE cannot find the usage of the class. It is normal.

### 39. Constructor Injection - Behind the Scenes

Coach.java
```java
package com.luv2code.springcoredemo;

public interface Coach {
    public String getDailyWorkout();
}
```

CrickeCoach.java
```java
package com.luv2code.springcoredemo;

@Component
public class CricketCoach implements Coach {
    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 minutes";
    }
}
```

DemoController.java
```java
package com.luv2code.springcoredemo;

@RestController
public class DemoController {
    private Coach myCoach;

    @Autowired
    public DemoController(Coach theCoach) {
        myCoach = theCoach;
    }
}
```

Spring Framework handles the constructor injection behind the scenes. It creates the object and injects the dependency.

```java
Coach theCoach = new CricketCoach();
DemoController theController = new DemoController(theCoach);
```

The "new" keyword is that it?

- Spring is more than just Inversion of Control and Dependency Injection.
- For small basic apps, it may be hard to see the benefits of Spring.

Spring for Enterprise Applications

- Spring is targeted for enterprise, real-time / real-world applications.
- Spring provides features such as
  - Database access and Transactions
  - REST API and Web MVC
  - Security

### 40. Component Scanning - Overview

Spring will scan java classes for special annotations and automatically register the beans in the Spring container.

SpringcoredemoApplication.java
```java
package com.luv2code.springcoredemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringcoredemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringcoredemoApplication.class, args);
    }
}
```

@SpringBootApplication annotation enables

- Auto-configuration
- Component scanning
- Additional configuration

It is composed of following annotations:

- @EnableAutoConfiguration: Enables Spring Boot's auto-configuration mechanism.
- @ComponentScan: Enables component scanning of current package and sub-packages.
- @Configuration: Able to register extra beans with @Bean or import other configuration classes.

Common Pitfall - Different location: By default, Spring Boot will not component scan these packages. Only package of main Spring Boot application class and sub-packages. You can add @ComponentScan annotation to the main Spring Boot application class.

```java
@SpringBootApplication(
    scanBasePackages = {
        "com.luv2code.springcoredemo",
        "com.luv2code.util",
        "org.acme.cart"
    }
)
```
