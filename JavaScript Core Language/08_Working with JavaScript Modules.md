# pluralsight-js-path

## 1.Working with JavaScript Modules

### 1.1. Course Overview

- What modules are
- The export syntax
- Import code
- Real-world example

## 2. What is a Module?

Inside the HTML file usulally we don't want to see JS code.

```html
<script src="js/app.js"></script>
```

If we want to protect file content from global scope in a way we can turn app.js to a IIFE(Immediately invoked function expression). We have another option, using a module.

What Are Modules?
- Import and Export keywords
- Encapsulate code
- Control access
- Reference its own dependencies

Module Considerations
- Modules are singletons
- Properties are bound
- Exports are static
- One module per file

## 3. Creating Modules

### Named Exports

Under an individual JS file:
```js
const errorMessage = 'This is a error msg.'

export function printAlert() {
  console.log(errorMessage);
}

export function popupAlert() {
  alert(errorMessage);
}
```
For export part also we can do this, template.js:
```js
const errorMessage = 'This is a error msg.'

function printAlert() {
  console.log(errorMessage);
}

function popupAlert() {
  alert(errorMessage);
}
export {printAlert, popupAlert};
```

On the other consumer file:
```js
import {printAlert, popupAlert} from './template.js';
```
### Default Exports

On the module file:
```js
export default function printMyName(){
  console.log("Test");
}
```
In another way
```js
function printMyName(){
  console.log("Test");
}
export {printMyName as default};
```

I can get the function without knowing the name.

On the consumer:
```js
import anyName from './module.js';
```
Aggregating Modules

We can strictly control when we expose some part of a module.
```js
export {getSessions as default, sessionURL};
export {sessionTemplate} from './template.js';
```
### **Summary**
- Export keyword
- Named exports
- Default exports
- Aggregating Modules

## 4. Using Modules

Most of the modern browerser support **import**.

HTML side expression:
```html
<script src="js/app.js" type="module"></script>
```
We need to use type "module" to use imported file as a module.

Module side:
```js
export {getSessions as default, sessionURL};
export {sessionTemplate} from './template.js';
```

Consumer side:
```js
import getSessions from './sessionRepository.js';
```
or
```js
import test from './sessionRepository.js';
```
in both ways we can access the default export.

Named Imports

We can override the resource name.
```js
export {sessionTemplate as template, errorMessage} from './template.js';
```

Also we can follow this way.

```js
export * as template from './template.js';

//template is a encapsulating object for exports
template.sessionTemplate(data.listItems);
```