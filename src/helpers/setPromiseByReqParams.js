import isString from "./isString";

export default function (path, method) {
  if (path !== undefined && !isString(path)) {
    throw new Error("Argument must be of type string");
  }

  const { baseUrl, reqOptions, } = this.options;

  if (!isString(baseUrl)) {
    throw new Error("The baseUrl option must be of type string");
  }

  return fetch(`${baseUrl}${path || ""}`, {
    ...reqOptions || {},
    method,
  });
}