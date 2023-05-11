# pluralsight-ts-path

## 1.TypeScript Core Language

### 1.1. Course Overview

- Configuring a TypeScript project
- Using types and functions
- Classes and interfaces
- Modules
- Type declaration files

You will know how to use all of the most important features.

## 2. Installing TypeScript and Configuring a Project

We can follow official [site](https://www.typescriptlang.org/).

TS Project Files

- Simple JSON text file named tsconfig.json
- Stores compşler options used with the project
- Specifies files to be included or excluded in compilation
- Support configuration inheritance

tsconfig.json:
```ts
{
    "compilerOptions": {
        "target": "es5",
        "noUnusedLocals": true,
        "outFile": "output.js"
    },
    "files": [
        "app.ts"
    ]
}
```

Creating a default config file:
```cmd
tsc --init
```

**Summary**
- TypeScript website
- Installation with npm
- Compiler options
- Project configuration with tsconfig.json
- Compiling with Webpack

## 3. Taking Advantage of Built-in Types

## 4. Writing Better Functions with TypeScript

## 5. Creating and Using Custom Types

## 6. Creating and Consuming Modules

## 7. Being More Productive with Type Declaration Files
