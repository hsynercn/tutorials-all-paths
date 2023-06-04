# Section 3: Generating Projects with the Nest CLI

We will use the nest cli:

```cmd
npm install -g @nestjs/cli
```

We will create a new project:

```cmd
nest new messages
```

This command will create a new folder named messages and it will create a new project inside this folder.

We can use nest commands to create boiler plate code:

```cmd
nest generate module messages
```

We can add a controller by this command:

```cmd
nest generate controller messages/messages --flat
```
