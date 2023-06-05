# Section 5: Nest Architecture: Services and Repositories

| Service                                             | Repository                                                            |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| Its a class                                         | Its a class                                                           |
| #1 place to put any business logic                  | #1 place to put storage-related logic                                 |
| Uses one or more repositories to find or store data | Usually ends up being a TypeORM entity, a Mongoose schema, or similar |

They frequently end up having very similar method names.

MessageService

- findOne(id: string)
- findAll()
- create(message: string)

MessageRepository

- findOne(id: string)
- findAll()
- create(message: string)

In these methods we will utilize the file read and write operations.

## Why Dependency Injection Exists

Components depend on other components. When we construct a component if we create dependencies inside the constructor, we are tightly coupling the component to the dependency.

Inversion of Control: Classes should not create instances of its dependencies on its own.

Bad: MessagesService creates its own copy of MessageRepository

```ts
export class MessageService {
  messageRepo: MessageRepository;
  constructor() {
    this.messageRepo = new MessageRepository();
  }
}
```

Better: MessageService receives its dependency

```ts
export class MessageService {
  messageRepo: MessageRepository;
  constructor(messageRepo: MessageRepository) {
    this.messageRepo = messageRepo;
  }
}
```

Best: MessagesService receives its dependency, and it does not specifically require a MessageRepository

```ts
interface MessageRepository {
  findOne(id: string): string;
  findAll(): string[];
  create(message: string): string;
}

export class MessageService {
  messageRepo: MessageRepository;
  constructor(messageRepo: MessageRepository) {
    this.messageRepo = messageRepo;
  }
}
```

In Production:

- class MessagesService: I need something that has a findOne, findAll, and create method to work correctly
- class MessageRepository: I can help you with that, I read and write on file

In Testing:

- class MessagesService: I need something that has a findOne, findAll, and create method to work correctly
- class FakeRepository: I can help you with that, I don't actually read and write on file

Nest DI(Dependency Injection) Container

- List of all the dependencies in our application
  - Class: MessagesService -> MessagesRepo
  - Class: MessagesRepo -> none

DI controller will create the required instances.

- List of instances that I have created
  - messagesRepo
  - messagesService

DI Container Flow

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and gives us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

For step 1 and 2 we will use 'Injectable' decorator on each class and add them to modules list of providers.

Step 3 and 4 happens automatically - Nest will try to create controller instances for us.

