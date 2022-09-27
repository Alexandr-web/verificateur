import isObject from "./isObject";
import isBoolean from "./isBoolean";

export default (options, defaultRegexp, regexpForSymbols, value) => {
  const rules = [];

  if (isObject(options)) {
    const { start = [], end = [], points = [], ignoreRegister, } = options;

    if (start.length && start.length && start.length === end.length) {
      start.map((num, index) => {
        for (let i = num; i <= end[index]; i++) {
          rules.push(new RegExp(regexpForSymbols, ignoreRegister ? "i" : "").test(value[i]));
        }
      });
    } else if (points.length) {
      points.map((point) => rules.push(new RegExp(regexpForSymbols, ignoreRegister ? "i" : "").test(value[point])));
    } else {
      rules.push(new RegExp(regexpForSymbols, ignoreRegister ? "i" : "").test(value));
    }
  } else if (isBoolean(options)) {
    rules.push(new RegExp(defaultRegexp, "g").test(value));
  }

  return rules;
};