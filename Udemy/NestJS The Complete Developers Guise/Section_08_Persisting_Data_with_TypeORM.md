# Section 8: Persisting Data with TypeORM

We are going to use a real database.

Nest works fine with any ORM, but works well out of the box with TypeORM and Mongoose.

TypeORM

- SQLite
- Postgres
- MySQL
- MongoDB

Mongoose

- MongoDB

We will begin with TypeORM and SQLite.

```cmd
npm install -save @nestjs/typeorm typeorm sqlite3
```

We could give the required configuration to app like this:

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

When we start our app we can see a sqllite file already.

At this point we need to create the entities.

- Create an entity file, and create a class in it that lists all the properties that your entity will have
- Connect the entity to its parent module. This creates a repository.
- Connect the entity to the root connection (in app module)

Synchronize true is not recommended for production. It is actively changing the database schema. We need to use migration in production to change the schema.

Repository API

- create(): makes a new instance of an entity, but does not save it to the database.
- save(): Add or updates a record to the DB
- find(): Runs a query and returns a list of entities
- findOne(): Run a query, returning the first record matching the search criteria
- remove(): Remove a record from the DB

To start with User we need to add body validation:

```ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

In the main.ts file we are setting whitelist to true. Additional properties will be removed from the request body. We don't want to save additional properties to the database.

We can use a DTO:

```ts
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
```
