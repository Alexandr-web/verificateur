import { isElement, } from "../helpers/index";

export default class Input {
  constructor(target) {
    this.target = target;
  }

  between(less, more) {
    if (!isElement(this.target)) {
      throw new Error("The target must be an HTML element");
    }

    if ([less, more].some((val) => typeof val !== "number")) {
      throw new Error("Argument must be of type number");
    }

    if (this.target.nodeName.toLowerCase() !== "input") {
      throw new Error("Target must be a input");
    }

    const value = parseInt(this.target.value);

    return isNaN(value) ? false : (value >= less && value <= more);
  }
}