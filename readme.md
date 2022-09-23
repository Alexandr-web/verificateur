# Verificateur

A tool that allows you to validate your form and also acts as a helper when submitting data to the server

# How to use it

```javascript
const input = document.querySelector(".input");
const inputVr = new Verificateur(input);

input.addEventListener("blur", () => {
  // If there are numbers and the minimum length is 9 characters
  if (inputVr.mustContain({ numbers: true, }) && inputVr.minLength(9)) {
    ...
  }
});
```