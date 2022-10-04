# Verificateur

A tool that allows you to validate your form and also acts as a helper when submitting data to the server

## Installation

To download, make sure you have [Nodejs](https://nodejs.org/) installed

```cmd
$ npm i verificateur --save-dev
```

## How to use it

```javascript
import Verificateur from "verificateur";

const input = document.querySelector(".input");
const inputVr = Verificateur(input);

input.addEventListener("blur", () => {
  // If there are numbers and the minimum length is 9 characters
  if (inputVr.onlyNumbers() && inputVr.minLength(9)) {
    ...
  }
});
```

## Methods

### between(less: Number, more: Number): Boolean
This method returns true if the value in input is greater than or equal to the `less` argument and less than or equal to the `more` argument

* `less`: Number *(REQUIRED)*
  

	Minimum value
* `more`: Number *(REQUIRED)*


	Maximum value

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

* `useSpace`: Boolean *(OPTIONAL)*


	Allows spaces
* `punctuationMarks`: Boolean *(OPTIONAL)*


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

* `useSpace`: Boolean *(OPTIONAL)*


	Allows spaces
* `punctuationMarks`: Boolean *(OPTIONAL)*


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
* `other`: Object|Array *(OPTIONAL)*


	The input value must contain the characters you specify

##### HTML
```html
<input class="ex-1" type="text" value="N1234 5678 9012 3456">
<input class="ex-2" type="text" value="12345678HELLO9012() 3456№;!">
<input class="ex-3" type="text" value="@@@ @@@">
```
##### JavaScript
```javascript
const input1 = document.querySelector(".ex-1");
const input2 = document.querySelector(".ex-2");
const input3 = document.querySelector(".ex-3");
const input1Vr = Verificateur(input1);
const input2Vr = Verificateur(input2);
const input3Vr = Verificateur(input3);

// true
console.log(input1Vr.mustContain({
    numbers: {
        // Here you specify indexes
        // Start and end indexes must match 
        // It turns out 4 ranges -> [1;4] [6;9] [11;14] [16;19]
        // [1;4] -> "N1234" - Numbers are contained from index 1 to index 4
        start: [1, 6, 11, 16],
        end: [4, 9, 14, 19],
    },
    // "points" specifies the indexes where the value should be contained (in our case, these are spaces)
    spaces: { points: [5, 10, 15], },
    other: {
        // Here the key is the character you want to see in the input string
        // Don't forget to put "\\" in front of your character
        "\\n": {
            points: [0],
            // Ignores case
            ignoreRegister: true,
        },
    }
}));

// You can use shorthand
console.log(input2Vr.mustContain({
    // The input value must have numbers
    numbers: true,
    // The input value must have spaces
    spaces: true,
    // The input value must have a ";"
    other: [";"],
}));

// true
console.log(input3Vr.mustContain({
    other: {
      "\\@": {
        // The number of these characters must be greater than or equal to 2
        amount: 2,
        // Character length
        length: 3,
      },
    }
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

### contains(values: Array): Boolean
This method returns true if the input value matches one of the values in the `values` argument.

The method includes the following arguments:

* `values`: Array *(REQUIRED)*


	List of possible values

##### HTML
```html
<input type="text" value="hello world">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.contains(["hello", "!", "all"]));
```

### mustNotContain(options: Object): Boolean
This method returns true if the input value will not contain the value from the "options" argument. Very similar to the `mustContain` method

The `options` argument has the following settings:

* `numbers`: Boolean|Object *(OPTIONAL)*


	The input value must not contain numbers
* `spaces`: Boolean|Object *(OPTIONAL)*


	The input value must not contain spaces
* `other`: Object|Array *(OPTIONAL)*


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

### weightLimit(size: Number, unit: String): Boolean
This method returns true if the weight of the files in input would be less than or equal to the `size` argument

The method includes the following arguments:

* `size`: Number *(REQUIRED)*


	limited size
* `unit`: String *(OPTIONAL)*


	File size unit. There are 5 in total: "bt" - bytes (default), "kb" - kilobytes,
"mb" - megabytes, "gb" - gigabytes, "tb" - terabytes

##### HTML
```html
<input type="file" multiple>
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

input.addEventListener("change", () => {
  // It will be true if the weight of all input files is less than 5 megabytes
  console.log(inputVr.weightLimit(5, "mb"));
});
```

### limitedAmount(size: Number): Boolean
This method returns true if the number of files uploaded would be less than or equal to the `size` argument

The method includes the following arguments:

* `size`: Number *(REQUIRED)*


	limited size

##### HTML
```html
<input type="file" multiple>
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

input.addEventListener("change", () => {
  // We want a maximum of 5 files
  console.log(inputVr.limitedAmount(5));
});
```

### mustContainType(types: String|Array): Boolean
Returns true if all files are of type `types` argument

The method includes the following arguments:

* `types`: String|Array *(REQUIRED)*


	Indicates the type(s) of file(s)

##### HTML
```html
<input type="file" multiple>
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

input.addEventListener("change", () => {
  // Will be true if the files are of any type from this list
  console.log(inputVr.mustContainType(["text/plain", "image/png"]));
});
```

### isBetween(value: String, left: String, right: String, useSpaces: Boolean, ignoreRegister: Boolean): Boolean
Returns true if the `value` argument is between the `left` and `right` arguments

The method includes the following arguments:

* `value`: String *(REQUIRED)*


	The value that must be between the `left` and `right` arguments

* `left`: String *(REQUIRED)*


	The value to be placed to the left of the value of the `value` argument

* `right`: String *(REQUIRED)*


	The value to be placed to the right of the value of the `value` argument

* `useSpaces`: Boolean *(OPTIONAL)*


	Allows for spaces between the right and left side

* `ignoreRegister`: Boolean *(OPTIONAL)*


	Allows you to ignore case

##### HTML
```html
<input type="text" value="Hello, world!">
```
##### JavaScript
```javascript
const input = document.querySelector("input");
const inputVr = Verificateur(input);

// true
console.log(inputVr.isBetween("world", ",", "!", true));

// false
console.log(inputVr.isBetween("world", ",", "!"));

// true
console.log(inputVr.isBetween("wOrLd", "HelLO,", "!", true, true));
```

### get(path: String): Promise
Allows you to send a get request

The method includes the following arguments:

* `path`: String *(OPTIONAL)*


	Additional path to the main

Take the [NASA API](https://api.nasa.gov/) as an example.

##### JavaScript
```javascript
const Ajax = Verificateur().Ajax;
const ajax = new Ajax({
  // Main path
  baseUrl: "https://api.nasa.gov",
  // Request parameters
  reqOptions: {
    headers: {
      "Content-Type": "application/json",
      "Accept-Type": "application/json",
    },
  },
});

// Response: {type: 'cors', url: 'https://api.nasa.gov/...', redirected: false, status: 200, ok: true, …}
ajax.get("/planetary/apod?api_key={your_key}")
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });
```

### post(path: String): Promise
Allows you to send a post request

The method includes the following arguments:

* `path`: String *(OPTIONAL)*


	Additional path to the main

##### JavaScript
```javascript
const Ajax = Verificateur().Ajax;
const ajax = new Ajax({
  baseUrl: "something",
  reqOptions: {
    headers: {
      "Content-Type": "application/json",
      "Accept-Type": "application/json",
    },
  },
});

ajax.post("/message/add")
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });
```

### put(path: String): Promise
Allows you to send a put request

The method includes the following arguments:

* `path`: String *(OPTIONAL)*


	Additional path to the main

##### JavaScript
```javascript
const Ajax = Verificateur().Ajax;
const ajax = new Ajax({
  baseUrl: "something",
  reqOptions: {
    headers: {
      "Content-Type": "application/json",
      "Accept-Type": "application/json",
    },
  },
});

ajax.put("/message/edit")
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });
```

### delete(path: String): Promise
Allows you to send a delete request

The method includes the following arguments:

* `path`: String *(OPTIONAL)*


	Additional path to the main

##### JavaScript
```javascript
const Ajax = Verificateur().Ajax;
const ajax = new Ajax({
  baseUrl: "something",
  reqOptions: {
    headers: {
      "Content-Type": "application/json",
      "Accept-Type": "application/json",
    },
  },
});

ajax.delete("/message/delete")
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });
```