# ResourcefulFish

## Utility Types

### Types from Types

TypeScript has a very powerful type system, with several tools for creating types out of other types.

These tools can be quite daunting at first. But the compiler also ships with several built-in utility types for handling some common cases.

You can get started on expressing the relationships between your types by using these utility types, without having to worry about how they are actually implemented. Later on you will learn how they are implemented, and how to write your own bespoke utility types.

You will likely already be familiar with at least two particularly common utility types: Record and Readonly.

Record<Key, Value> is for creating an object type with keys of type Key and values of type Value. For example:

```ts
type Contact = {
  name: string
  email: string
  phone: number
}

type AddressBook = Record<string, Contact>
// {
//   [key: string]: Contact
// }

type SmallAddressBook = Record<"ada" | "charles" | "michael", Contact>
// {
//   ada: Contact
//   charles: Contact
//   michael: Contact
// }
```

Readonly is for creating an object type whose properties are all readonly:

```ts
type ImmutableContact = Readonly<Contact>
// {
//   readonly name: string
//   readonly email: string
//   readonly phone: number
// }
```

### Object Utility Types

TypeScript provides two pairs of complementary utility types for creating one object type from another.

#### Partial and Required

Partial creates a type containing some of the properties of another type, i.e. all of those properties are made optional. Required creates a type containing all of the properties of another type, i.e. all of those properties are made non-optional.

```ts
type Contact = {
  name: string
  email: string
  phone?: number
}

type PartialContact = Partial<Contact>
// {
//   name?: string
//   email?: string
//   phone?: number
// }

type FullContact = Required<Contact>
// {
//   name: string
//   email: string
//   phone: number
// }
```

A common use for the Partial utility type is in a function for updating the values of an object, when you want to allow any (but not necessarily all) of the values to be updated:

```ts
function updateContact(contact: Contact, fieldsToUpdate: Partial<Contact>): Contact {
  return { ...contact, ...fieldsToUpdate }
}

const adaAtWork: Contact = { name: "Ada", email: "ada@skillerwhale.com" }
const adaAtHome: Contact = updateContact(adaAtWork, { email: "ada@loveplaice.com" })
```

#### Pick and Omit

Pick creates a type containing only the properties with the keys you specify. Omit creates a type containing all the remaining properties that you don't specify.

```ts
type Contact = {
  name: string
  email: string
  phone?: number
}

type EmailContact = Pick<Contact, "name" | "email">
// {
//   name: string
//   email: string
// }

type PhoneContact = Omit<Contact, "email">
// {
//   name: string
//   phone?: number
// }
```

The Pick and Omit utility types are useful when you want to create more general object types (i.e. object types with fewer properties) out of your existing ones. They are effectively a stylistic alternative to defining the more general types first, and creating the more particular types as intersections of those. For example, the code above is logically equivalent to this:

```ts
type Contact = EmailContact & PhoneContact

type EmailContact = {
  name: string
  email: string
}

type PhoneContact = {
  name: string
  phone?: number
}
```

### Union Utility Types

TypeScript provides three utility types for working with union types.

NonNullable takes any type that might include null or undefined and returns the corresponding type without those possibilities.

```ts
type OptionalNumber = number | null | undefined

type JustANumber = NonNullable<Number> // number
```

Extract<A, B> creates a subtype of A containing all the values compatible with B.

```ts
type SmallOddNumbers = 1 | 3 | 5 | 7 | 9

type SmallPrimes = 2 | 3 | 5 | 7 | 11

type SmallOddPrimes = Extract<SmallOddNumbers, SmallPrimes> // '3 | 5 | 7'
```

For union types, Extract<A, B> is equivalent to the intersection A & B. You can use Extract with other types, and that equivalence won't hold - but Extract is typically used with union types, in which case it may just be stylistically preferred.

Exclude<A, B> creates a subtype of A containing all the values not compatible with B.

```ts
type WhiteKey = "A" | "B" | "C" | "D" | "E" | "F" | "G"

type Key = WhiteKey | "A#" | "C#" | "D#" | "F#" | "G#"

type BlackKey = Exclude<Key, WhiteKey> // "A#" | "C#" | "D#" | "F#" | "G#"
```

### Function Utility Types

There are also several utility types for getting types from function types.

ReturnType gets the return type of a function:

```ts
function contactToString(contact: Contact): string {
  return `${contact.name} (${contact.email})`
}

type StringByAnotherName = ReturnType<typeof contactToString>
```

Parameters gets a tuple type corresponding to the parameters of a function, while ConstructorParameters gets a tuple type corresponding to the parameters of a class constructor. For example:

```ts
function createContact(name: string, email: string, phone: number) {
  return { name, email, phone }
}

type Params = Parameters<typeof createContact>
// [string, string, number]

class Contact {
  constructor(public name: string, public email: string, public phone: number) {}
}

type ConstructorParams = ConstructorParameters<typeof Contact>
// [string, string, number]
```

Note that Contact is the type of the instances of the class. You need to pass in typeof Contact to ConstructorParams to get the type of the class (i.e. of the constructor function) - just like you need to pass in typeof createContact to Parameters to get the type of the function.

Finally, InstanceType gets the instance type of a class back from its corresponding class type.

```ts
type ContactByAnotherName = InstanceType<typeof Contact>
```

If your preference is to define your types up front, and use type annotations liberally, you might write code like this and have little use for these function utility types:

```ts
type Contact = {
  name: string
  email: string
  phone: number
}

function createContact(name: string, email: string, phone: number): Contact {
  return { name, email, phone }
}
```

But if your preference is to keep your type definitions to a minimum, and leave as much as possible up to inference, then you might instead write code like this, letting the value determine the type:

```ts
function createContact(name: string, email: string, phone: number) {
  return { name, email, phone }
}

type Contact = ReturnType<typeof createContact>
```
