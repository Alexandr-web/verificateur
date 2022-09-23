import isElement from "./isElement";

export default (target) => {
  return target && typeof target === "object" && !Array.isArray(target) && !isElement(target);
};