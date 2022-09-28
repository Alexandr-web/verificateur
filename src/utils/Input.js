import { isElement, isFormElement, isNumber, isString, isObject, checkStringFromBeginningToEnd, isArray, } from "../helpers/index";

export default class Input {
  hasLetters() {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    return /[a-zа-я]+/gi.test(this.value);
  }

  hasNumbers() {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    return /\d+/gi.test(this.value);
  }

  onlyLetters(options = {}) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }
   
    const { useSpace, punctuationMarks, } = options;
    const spaceRegexp = "|(?\\s)";
    const punctuationMarksRegexp = "|(?.,!@#$%^&*()\u9999)";
    const regexp = new RegExp(`^[a-z|а-я${useSpace ? spaceRegexp : ""}${punctuationMarks ? punctuationMarksRegexp : ""}]+$`, "ig");
    
    return regexp.test(this.value);
  }

  between(less, more) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if ([less, more].some((val) => !isNumber(val))) {
      throw new Error("Arguments must be of type number");
    }

    const value = parseInt(this.value);

    return isNaN(value) ? false : (value >= less && value <= more);
  }

  isEmpty() {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    return !this.value.length;
  }

  toBe(string, ignoreRegister = false) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isString(string)) {
      throw new Error("First argument must be of type string");
    }

    const regexp = new RegExp(`^${string}$`, ignoreRegister ? "i" : "");

    return regexp.test(this.value);
  }

  onlyNumbers(options = {}) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }
    
    const { useSpace, punctuationMarks, } = options;
    const spaceRegexp = "|(?\\s)";
    const punctuationMarksRegexp = "|(?.,!@#$%^&*()\u9999)";
    const regexp = new RegExp(`^[\\d${useSpace ? spaceRegexp : ""}${punctuationMarks ? punctuationMarksRegexp : ""}]+$`, "ig");
    
    return regexp.test(this.value);
  }

  isDate(yearIsStart = false, separator = ".") {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (separator !== undefined && !isString(separator)) {
      throw new Error("Argument must be of type string");
    }

    const regexp = new RegExp(`^\\d{${yearIsStart ? 4 : 2}}${separator}\\d{2}${separator}\\d{${yearIsStart ? 2 : 4}}$`);
    
    return regexp.test(this.value);
  }

  isUrl() {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    return /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(this.value);
  }

  isEmail() {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.value);
  }

  beginWith(begin, ignoreRegister = false) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isString(begin)) {
      throw new Error("The first argument must be of type string");
    }

    const regexp = new RegExp(`^${begin}`, ignoreRegister ? "i" : "");

    return regexp.test(this.value);
  }

  endWith(end, ignoreRegister = false) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isString(end)) {
      throw new Error("The first argument must be of type string");
    }

    const regexp = new RegExp(`${end}$`, ignoreRegister ? "i" : "");

    return regexp.test(this.value);
  }

  minLength(number) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isNumber(number)) {
      throw new Error("The first argument must be of type number");
    }

    return this.value.length >= number;
  }

  maxLength(number) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isNumber(number)) {
      throw new Error("The first argument must be of type number");
    }

    return this.value.length <= number;
  }

  mustContain(options) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isObject(options)) {
      throw new Error("Argument must be of type object");
    }

    let rules = [];
    const { numbers, spaces, other, } = options;

    if (numbers) {
      rules = rules.concat(checkStringFromBeginningToEnd(numbers, /\d+/, /\d/, this.value));
    }

    if (spaces) {
      rules = rules.concat(checkStringFromBeginningToEnd(spaces, /\s+/, /\s/, this.value));
    }

    if (other) {
      if (isObject(other)) {
        Object.keys(other).map((key) => {
          // Каждый ключ - отдельный символ
          rules = rules.concat(checkStringFromBeginningToEnd(other[key], key, key, this.value));
        });
      }

      if (isArray(other)) {
        other.map((symbol) => {
          if (isString(symbol)) {
            rules.push(this.value.includes(symbol));
          }

          if (isObject(symbol) && symbol.regexp) {
            rules = rules.concat(checkStringFromBeginningToEnd(symbol, symbol.regexp, symbol.regexp, this.value));
          }
        });
      }
    }

    return rules.every(Boolean);
  }

  mustNotContain(options) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isObject(options)) {
      throw new Error("Argument must be of type object");
    }

    let rules = [];
    const { numbers, spaces, other, } = options;

    if (numbers) {
      rules = rules.concat(checkStringFromBeginningToEnd(numbers, /\d+/g, /\d/, this.value));
    }

    if (spaces) {
      rules = rules.concat(checkStringFromBeginningToEnd(spaces, /\s+/g, /\s/, this.value));
    }

    if (other) {
      if (isObject(other)) {
        Object.keys(other).map((key) => {
          // Каждый ключ - отдельный символ
          rules = rules.concat(checkStringFromBeginningToEnd(other[key], key, key, this.value));
        });
      }

      if (isArray(other)) {
        other.map((symbol) => {
          if (isString(symbol)) {
            rules.push(this.value.includes(symbol));
          }

          if (isObject(symbol) && symbol.regexp) {
            rules = rules.concat(checkStringFromBeginningToEnd(symbol, symbol.regexp, symbol.regexp, this.value));
          }
        });
      }
    }

    return !rules.every(Boolean);
  }

  contains(values) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isFormElement(this)) {
      throw new Error("The target must be one of the following: input, textarea, select, datalist or output");
    }

    if (!isArray(values)) {
      throw new Error("Argument must be of type array");
    }

    if (values.some((val) => !isString(val))) {
      throw new Error("Arguments must be of type string");
    }

    return values.map((val) => this.value.includes(val)).some(Boolean);
  }
}