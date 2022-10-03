import { isString, } from "../helpers";

export default class Ajax {
  constructor(options) {
    this.options = options;
  }

  get(path) {
    if (path !== undefined && !isString(path)) {
      throw new Error("Argument must be of type string");
    }

    const { baseUrl, reqOptions, } = this.options;

    return fetch(`${baseUrl}${path || ""}`, {
      ...reqOptions,
      method: "GET",
    });
  }
}