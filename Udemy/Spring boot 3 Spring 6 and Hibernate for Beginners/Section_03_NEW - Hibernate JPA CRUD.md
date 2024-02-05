# [NEW] Spring Boot 3 Spring 6 and Hibernate for Beginners

## Section 3: NEW - Hibernate / JPA CRUD

### 62. Hibernate / JPA Overview

- What is Hibernate?
- Benefits of Hibernate
- What is JPA?
- Benefits of JPA

Hibernate is a framework for persisting / saving Java objects in a database.

Benefits of Hibernate:

- Handles all of the low-level SQL
- Minimizes the amount of JDBC code you have to develop
- Hibernate provides the Object-to-Relational Mapping (ORM)

Object-To-Relational Mapping (ORM)

- We define the mapping between Java class and database table.

```mermaid
graph LR
  A[Java Class] --> B 
  B[Hibernate] --> C
  C[Database Table] --> B
  B --> A
```

What is JPA?

- Jakarta Persistence API (JPA) is a Java specification for accessing, persisting, and managing data between Java objects / classes and a relational database.
- Standard API for Object-to-Relational Mapping (ORM).
- Only a specification, not an implementation.
  - Defined a set of interfaces
  - Requires an implementation to be usable

```mermaid
graph
  A[JPA Spec] --> B[Hibernate] 
  A --> C[EclipseLink]
```

What are the benefits of JPA?

- By having a standard API, we are not vendor locked in.
- Maintain portable, flexible code by using JPA interfaces.
- Can theoretically switch vendor implementations:
  - For example, if vendor A stops supporting their product we can switch to vendor B.

Code snippet:

```java
// create Java object
Student theStudent = new Student("Paul", "Wall", "paul@gmail.com");

// save the student
entityManager.persist(theStudent);
```

Old days of JDBC you would have to manually write the SQL code.

Retrieving data:

```java
int theId = 1;
Student theStudent = entityManager.find(Student.class, theId);
```

Querying for Java Objects:

```java
TypedQuery<Student> theQuery = entityManager.createQuery("from Student", Student.class);
List<Student> students = theQuery.getResultList();
```

We will cover CRUD:

- Create
- Read
- Update
- Delete

### 63. Hibernate, JPA and JDBC

Hibernate / JPA uses JDBC for all database interactions.

```mermaid
graph LR
  A[Java App] <--> B[JPA Hibernate]
  B <--> C[JDBC]
  C <--> D[Database]
```

### 64. Setting Up Development Environment

In this course we will use MySQL database.

- MySQL includes two components:
  - MySQL Server
  - MySQL Workbench

Installing:

- MySQL Server: [link](https://dev.mysql.com/downloads/mysql/)
- MySQL Workbench: [link](https://dev.mysql.com/downloads/workbench/)

### 65. Setting Up Database Table - Overview

01-create-student-table.sql

Creates a new MySQL user for our application.

- user id: springstudent
- password: springstudent

02-create-student-table.sql

Creates a new table in the database.

- id
- first_name
- last_name
- email

01-create-student-table.sql

```sql
-- Drop user first if they exist
DROP USER IF EXISTS 'springstudent'@'localhost';

-- Now create user with prop privileges
CREATE USER 'springstudent'@'localhost' IDENTIFIED BY 'springstudent';

GRANT ALL PRIVILEGES ON * . * TO 'springstudent'@'localhost';
```

After we execute the script it will create a new user and grant them all privileges.

02-create-student-table.sql

```sql
CRETE DATABASE IF NOT EXISTS 'student_tracker';
USE 'student_tracker';

DROP TABLE IF EXISTS 'student';

CREATE TABLE 'student' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'first_name' varchar(45) DEFAULT NULL,
  'last_name' varchar(45) DEFAULT NULL,
  'email' varchar(45) DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

### 67. Setting Up Spring Boot Project - Overview

Automatic Data Source Configuration

- In Spring Boot, Hibernate is the default implementation of JPA.
- EntityManager is main component for creating queries etc.
- EntityManager is from Jakarta Persistence API (JPA).

Based on configs, Spring Boot will automatically create the beans: DataSource, EntityManagerFactory, ...

You can then inject these into your app, for example your DAO (Data Access Object) classes.

Setting up Project with Spring Initializr

- MySQL Driver: mysql-connector-j
- Spring Data JPA: spring-boot-starter-data-jpa

Spring Boot will automatically configure your data source for you.

application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker
spring.datasource.username=springstudent
spring.datasource.password=springstudent
```

We will start with a Command Line App:

```java
@SpringBootApplication
public class CruddemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(CruddemoApplication.class, args);
  }

  @Bean
  public CommandLineRunner commandLineRunner(String[] args) {
    return runner -> {
      System.out.println("Hello World");
    };
  }
}
```

### 68. Setting Up Spring Boot Project - Coding - Part 1

Java code:
  
```java
@SpringBootApplication
public class CruddemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(CruddemoApplication.class, args);
  }

  @Bean
  public CommandLineRunner commandLineRunner(StudentRepository studentRepository) {
    return runner -> {
      System.out.println("Hello World");
    };
  }
}
```

### 69. Setting Up Spring Boot Project - Coding - Part 2

We need to add properties to application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker
spring.datasource.username=springstudent
spring.datasource.password=springstudent
```

If we use a wrong URL, username or password we will get an exception.

Side note: We can disable the spring banner by adding `spring.main.banner-mode=off` to application.properties.

We can change the logging level by adding `logging.level.org.springframework=warn` to application.properties.

### 70. JPA Annotations - Overview

Hibernate is the default JPA implementation in Spring Boot.

Entity Class: Java class that is mapped to a database table.

```mermaid
graph LR
  A[Java Class] --> B 
  B[Hibernate] --> C
  C[Database Table] --> B
  B --> A
```

Entity Class

- Must be annotated with @Entity
- Must have a no-arg constructor, the class can have other constructors

Constructor Reminder

- If you don't define any constructors, Java will provide a default no-arg constructor.
- If you declare constructors with arguments, Java will not provide a default no-arg constructor.

Java Annotations

- Step 1: Map class to database table
- Step 2: Map fields to database columns

Java code:

```java
@Entity
@Table(name="student")
public class Student {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @Column(name="first_name")
  private String firstName;

  @Column(name="last_name")
  private String lastName;

  @Column(name="email")
  private String email;
}
```

@Column - Optional

- Actually, the use of @Column is optional.
- If not specified, the column name is the same as Java field.
- In general, we shouldn't use this approach.
  - If you refactor the Java code, then it will not match existing database columns.
  - This is a breaking change and you will need to update column.
- Same applies to table name.

Primary Key: Unique identifier for each row in the table. Cannot be null.

ID Generation Strategy

- GenerationType.IDENTITY: Database will automatically generate the primary key.
- GenerationType.SEQUENCE: Database will use a database sequence to generate the primary key.
- GenerationType.TABLE: Database will use a database table to generate the primary key.
- GenerationType.AUTO: Hibernate will choose the generation strategy based on the database.

In addition we can create our own ID generation strategy.
