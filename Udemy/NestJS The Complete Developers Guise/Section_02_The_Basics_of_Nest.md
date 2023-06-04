# Section 2: The Basics of Nest

We need know TypeScript to use NestJS and we need to understand basics of Node.

Nest CLI: We will create a new project with Nest CLI. We will focus on the internals.

```cmd
mkdir scratch
cd scratch
npm init -y
```

We will install Nest CLI globally.

```cmd
npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2 -save
```

After installation we should see something like this under the package dependencies:

```json
{
  "name": "scratch",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@nestjs/common": "^7.6.17",
    "@nestjs/core": "^7.6.17",
    "@nestjs/platform-express": "^7.6.17",
    "reflect-metadata": "^0.1.13",
    "typescript": "^4.3.2"
  }
}
```

- nestjs/common: Contains vast majority of NestJS features.
- nestjs/core: Contains the core NestJS framework.
- nestjs/platform-express: Lets Nest use Express JS for handling HTTP requests.
- reflect-metadata: Lets Nest use decorators.
- typescript: NestJS is written in TypeScript.

For HTTP server implementation we can use Express or Fastify.

We can use this TypeScrit configuration:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Steps for a request response cycle:

- Pipe: Validate data contained in the request
- Guard: Make sure the user is authenticated
- Controller: Route the request to a particular function
- Service: Run business logic
- Repository: Access a database

Parts of Nest

- Controllers: Handle incoming requests
- Services: Handles data access and business logic
- Modules: Groups together code
- Pipes: Validates incoming data
- Filters: Handles errors that occur during request handling
- Guards: Handles authentication
- Interceptors: Adds extra logic to incoming requests or outgoing responses
- Repositories: Handles data stored in a DB

At minimum a NestJS application needs a module and a controller.

This could be basic main.ts file:

```ts
import { Controller, Module, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//module wraps a controller

@Controller() // decorator, this will be a controller
class AppController {
    @Get()
    getRootRoute() {
        return 'Hello World!';
    }
}

//nest will create instances of the controllers and inject them into the module
@Module({
    controllers: [AppController]
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
```

We can start the application with:

```cmd
npx ts-node src/main.ts
```

After the start we should be able to see a response from 'localhost:3000'.

## File Naming Conventions

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of file should match
- Filename template: name.type_of_things.ts

We will use one class per file.

## Routing

We can customize the API endpoints:

```ts
@Controller('/app') // decorator, this will be a controller
export class AppController {
    @Get()
    getRootRoute() {
        return 'Hello World!';
    }
    @Get('/asdf')
    getAnotherRoute() {
        return 'Hello ASDF!';
    }
    @Get('/bye')
    getByeThere() {
        return 'Bye there!';
    }
}
```

In this case we are creating a controller with three routes.

- localhost:3000/app
- localhost:3000/app/asdf
- localhost:3000/app/bye
