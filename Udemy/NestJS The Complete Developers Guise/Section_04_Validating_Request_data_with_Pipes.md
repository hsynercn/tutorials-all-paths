# Section 4: Validating Request data with Pipes

We can use multiple decorators to access request data:

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'list of messages';
  }

  @Post()
  createMessage(@Body() body: any) {
    console.log(body);
    return 'create a message';
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return 'one message';
  }
}
```

- @Param: Access route parameters
- @Body: Access request body
- @Query: Access query parameters
- @Headers: Access request headers

For validation we can use this global configuration:

```ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

Setting Up Automatic Validation

1- Tell Nest to use global validation
2- Create a class that describes the different properties that the request body should have
3- Add validation rules to the class
4- Apply that class to the request handler

For specific validation we can use dto objects:

```ts
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
}
```

For the validation process we are using class-validator and class-transformer.

Class Validator: A TypeScript module for object validation.
Class Transformer: A TypeScript module for object transformation.

In our NestJS app Validation Pipe:

- Uses class-transformer to turn the body into an instance of the DTO class
- Uses class-validator to validate the instance
- If there are validation errors, respond immediately, otherwise provide body to request handler

In our controller:

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'list of messages';
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return 'create a message';
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return 'one message';
  }
}
```

We are using the DTO class to validate the request body. Normally we transform TypeScript to JavaScript and we don't keep the types in the JavaScript code. But in this case we are using the types to validate the request body.

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

With these configurations we are telling TypeScript to keep the types in the JavaScript code. If we inspect the JavaScript code we can see the type information metadata.
