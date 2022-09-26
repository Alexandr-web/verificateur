# Verificateur

A tool that allows you to validate your form and also acts as a helper when submitting data to the server

## How to use it

```javascript
import Verificateur from "verificateur";

const input = document.querySelector(".input");
const inputVr = Verificateur(input);

input.addEventListener("blur", () => {
  // If there are numbers and the minimum length is 9 characters
  if (inputVr.mustContain({ numbers: true, }) && inputVr.minLength(9)) {
    ...
  }
});
```

## Methods

### between(less: Number, more: Number): Boolean
This method takes 2 arguments - less than and more than. It returns true if the input value is in this range

##### HTML
  ```html
<input type="text" value="25">
  ```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.between(0, 100));
```
 

### onlyLetters(options: Object): Boolean
This method returns true if the input value contains only letters. The options argument is optional, use it if you want to declare new options

The options argument includes the following options:

* `useSpace`: Boolean
	Allows spaces
* `punctuationMarks`: Boolean
	Allows the use of punctuation (?.,!@#$%^&*())

##### HTML
```html
<input type="text" value="Hello, world!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.onlyLetters({
    useSpace: true,
    punctuationMarks: true,
}));
 ```
 

### onlyNumbers(options: Object): Boolean
This method returns true if the input value contains only numbers. The options argument is optional, use it if you want to declare new options.

The options argument includes the following options:

* `useSpace`: Boolean
	Allows spaces
* `punctuationMarks`: Boolean
	Allows the use of punctuation (?.,!@#$%^&*())

##### HTML
```html
<input type="text" value="1, 2, 3, 4, 5!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true

console.log(inputVr.onlyNumbers({
    useSpace: true,
    punctuationMarks: true,
}));
```
 

### isEmail(): Boolean
This method checks if the value in input is email

##### HTML
```html
<input type="text" value="mail@mail.com">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.isEmail());
```
  
### hasLetters(): Boolean
This method returns true if the value in input contains at least one letter

##### HTML
```html
<input type="text" value="example 123!!!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.hasLetters());
```

### hasNumbers(): Boolean
This method returns true if the value in the input contains at least one number

##### HTML
```html
<input type="text" value="example 123!!!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.hasNumbers());
```

### isEmpty(): Boolean
This method returns true if the input value contains an empty string

##### HTML
```html
<input type="text">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.isEmpty());
```

### beginWith(begin: String, ignoreRegister: Boolean): Boolean
This method returns true if the value in input starts with the `begin` argument

The method includes the following arguments:

* `begin`: String *(REQUIRED)*
	The value that the value in input should start with
* `ignoreRegister`: Boolean *(OPTIONAL)*
	Ignores case

##### HTML
```html
<input type="text" value="HeLlO!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.beginWith("hello", true));
```

### endWith(end: String, ignoreRegister: Boolean): Boolean
This method returns true if the input value ends with the `end` argument

The method includes the following arguments:

* `end`: String *(REQUIRED)*
	The value that the input value should end with
* `ignoreRegister`: Boolean *(OPTIONAL)*
	Ignores case

##### HTML
```html
<input type="text" value="Hello, wOrLd!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.endWith("world!", true));
```

### minLength(number: Number): Boolean
This method returns true if the length of the value in input is greater than or equal to the `number` argument

The method includes the following arguments:

* `number`: Number *(REQUIRED)*
	Minimum value length in input

##### HTML
```html
<input type="text" value="Hello, world!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.minLength(3));
```

### maxLength(number: Number): Boolean
This method returns true if the length of the input value is less than or equal to the number argument.

The method includes the following arguments:

* `number`: Number *(REQUIRED)*
	Maximum value length in input

##### HTML
```html
<input type="text" value="Hello, world!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.maxLength(12));
```

### mustContain(options: Object): Boolean
This method returns true if the value in input will contain the values from the `options` argument

The `options` argument has the following settings:

* `numbers`: Boolean|Object *(OPTIONAL)*
	The input value must contain numbers
* `spaces`: Boolean|Object *(OPTIONAL)*
	The input value must contain spaces
* `other`: Object *(OPTIONAL)*
	The input value must contain the characters you specify

##### HTML
```html
<input class="ex-1" type="text" value="N1234 5678 9012 3456">
<input class="ex-2" type="text" value="12345678HELLO9012() 3456№;!">
```
##### JavaScript
```javascript
const input1 = document.querySelector(".ex-1");
const input2 = document.querySelector(".ex-2");
const input1Vr = Verificateur(input1);
const input2Vr = Verificateur(input2);

// true
console.log(input1Vr.mustContain({
    numbers: {
        // Here you specify indexes
        // Start and end indexes must match 
        // It turns out 4 ranges -> [1;4] [6;9] [11;14] [16;19]
        // [1;4] -> "№1234" - Numbers are contained from index 1 to index 4
        start: [1, 6, 11, 16],
        end: [4, 9, 14, 19],
    },
    // "points" specifies the indexes where the value should be contained (in our case, these are spaces)
    spaces: { points: [5, 10, 15], },
    other: {
        // Here the key is the character you want to see in the input string
        "n": {
            points: [0],
            // Ignores case
            ignoreRegister: true,
        },
    }
}));

// You can also pass a boolean value
console.log(input1Vr.mustContain({
    // The input value must have numbers
    numbers: true,
    // The input value must have spaces
    spaces: true,
    // The input value must have a ";"
    other: { ";": true, },
}));
```

### toBe(value: String, ignoreRegister: Boolean): Boolean
This method returns true if the value in input matches the `value` argument

The method includes the following arguments:

* `value`: String *(REQUIRED)*
	The value that must match the content of the input
* `ignoreRegister`: String *(OPTIONAL)*
	Ignores case

##### HTML
```html
<input type="text" value="Hello, world!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.toBe("HeLlO, wOrLd!"));
```

### isDate(yearIsStart: Boolean, separator: String): Boolean
This method returns true if the value in input is a date

The method includes the following arguments:

* `yearIsStart`: String *(OPTIONAL)*
	Indicates that the year comes first
* `separator`: String *(OPTIONAL)*
	Date separator (default is ".")

##### HTML
```html
<input type="text" value="2004/11/10">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.isDate(true, "/"));
```

### isUrl(): Boolean
This method returns true if the value in input is a url

##### HTML
```html
<input type="text" value="www.google.com">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.isUrl());
```

### mustNotContain(options: Object): Boolean
This method returns true if the input value will not contain the value from the "options" argument. Very similar to the `mustContain` method

The `options` argument has the following settings:

* `numbers`: Boolean|Object *(OPTIONAL)*
	The input value must not contain numbers
* `spaces`: Boolean|Object *(OPTIONAL)*
	The input value must not contain spaces
* `other`: Object *(OPTIONAL)*
	The input value must not contain the characters you specify

##### HTML
```html
<input type="text" value="abcd...">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.mustNotContain({
    numbers: true,
    spaces: true,
}));
```