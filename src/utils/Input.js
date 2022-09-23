import { isElement, isInput, isNumber, isString, isObject, } from "../helpers/index";

export default class Input {
  constructor(target) {
    this.target = target;
  }

  between(less, more) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if ([less, more].some((val) => !isNumber(val))) {
      throw new Error("Argument must be of type number");
    }

    const value = parseInt(this.target.value);

    return isNaN(value) ? false : (value >= less && value <= more);
  }

  hasLetters() {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    return /[a-zа-я]+/gi.test(this.target.value);
  }

  hasNumbers() {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    return /\d+/gi.test(this.target.value);
  }

  onlyLetters(options = {}) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }
   
    const { useSpace, punctuationMarks, } = options;
    const spaceRegexp = "|(?\\s)";
    const punctuationMarksRegexp = "|(?\\.,!@#\\$%\\^&\\*\\(\\)\u9999)";
    const regexp = new RegExp(`^[a-z|а-я${useSpace ? spaceRegexp : ""}${punctuationMarks ? punctuationMarksRegexp : ""}]+$`, "ig");
    
    return regexp.test(this.target.value);
  }

  onlyNumbers(options) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }
    
    const { useSpace, punctuationMarks, } = options;
    const spaceRegexp = "|(?\\s)";
    const punctuationMarksRegexp = "|(?.,!@#$%^&*()\u9999)";
    const regexp = new RegExp(`^[\\d${useSpace ? spaceRegexp : ""}${punctuationMarks ? punctuationMarksRegexp : ""}]+$`, "ig");
    
    return regexp.test(this.target.value);
  }

  isEmail() {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.target.value);
  }

  isEmpty() {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    return !this.target.value.length;
  }

  beginWith(begin, ignoreRegister = false) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if (!isString(begin)) {
      throw new Error("The first argument must be of type string");
    }

    const regexp = new RegExp(`^${begin}`, ignoreRegister ? "i" : "");

    return regexp.test(this.target.value);
  }

  endWith(end, ignoreRegister = false) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if (!isString(end)) {
      throw new Error("The first argument must be of type string");
    }

    const regexp = new RegExp(`${end}$`, ignoreRegister ? "i" : "");

    return regexp.test(this.target.value);
  }

  minLength(number) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if (!isNumber(number)) {
      throw new Error("The first argument must be of type number");
    }

    return this.target.value.length >= number;
  }

  maxLength(number) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if (!isNumber(number)) {
      throw new Error("The first argument must be of type number");
    }

    return this.target.value.length <= number;
  }

  mustContain(options) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }
  
    if (!isInput(this.target)) {
      throw new Error("Target must be a input");
    }

    if (!isObject(options)) {
      throw new Error("Argument must be of type object");
    }

    const rules = [];
    const {
      numbers,
      spaces,
      other = [],
    } = options;

    if (numbers) {
      rules.push(/\d+/gi.test(this.target.value));
    }

    if (spaces) {
      rules.push(/\s+/g.test(this.target.value));
    }

    if (other.length) {
      rules.push(other.every((symbol) => this.target.value.includes(symbol)));
    }

    return rules.every(Boolean);
  }
}