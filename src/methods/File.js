import {
  isElement,
  isNumber,
  isInputFile,
  getInKilobytes,
  getInMegabytes,
  getInGigabytes,
  receiveInTerabytes,
  isString,
  isArray,
} from "../helpers/index";

export default class File {
  weightLimit(size, unit = "bt") {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }

    if (!isInputFile(this)) {
      throw new Error("The target must be of type file");
    }

    if (!isNumber(size)) {
      throw new Error("Argument must be of type number");
    }

    if (unit !== undefined && !isString(unit)) {
      throw new Error("The second argument must be of type string");
    }

    const totalSize = [...this.files].reduce((acc, { size: sizeFile, }) => acc += sizeFile, 0);

    switch (unit) {
      case "kb":
        return getInKilobytes(totalSize) <= size;
      case "mb":
        return getInMegabytes(totalSize) <= size;
      case "gb":
        return getInGigabytes(totalSize) <= size;
      case "tb":
        return receiveInTerabytes(totalSize) <= size;
      
      default:
        return totalSize <= size;
    }
  }

  mustContainType(types) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }

    if (!isInputFile(this)) {
      throw new Error("The target must be of type file");
    }

    if (!isString(types) && !isArray(types)) {
      throw new Error("Argument must be of type string or array");
    }

    if (isArray(types)) {
      return [...this.files].every(({ type, }) => types.includes(type));
    }

    return [...this.files].every(({ type, }) => type === types);
  }

  limitedQuantity(size) {
    if (!isElement(this)) {
      throw new Error("The target must be an HTML element");
    }

    if (!isInputFile(this)) {
      throw new Error("The target must be of type file");
    }

    if (!isNumber(size)) {
      throw new Error("Argument must be of type number");
    }

    return this.files.length <= size;
  }
}