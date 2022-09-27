import isObject from "./isObject";
import isBoolean from "./isBoolean";

export default (options, defaultRegexp, regexpForSymbols, value) => {
  const rules = [];

  if (isObject(options)) {
    const { start = [], end = [], points = [], ignoreRegister, } = options;

    if (start.length && start.length && start.length === end.length) {
      // Проверка символов, входящих в диапазон от num до end[index]
      start.map((num, index) => {
        for (let i = num; i <= end[index]; i++) {
          rules.push(new RegExp(regexpForSymbols, ignoreRegister ? "i" : "").test(value[i]));
        }
      });
    } else if (points.length) {
      // Проверка символов по индексу
      points.map((point) => rules.push(new RegExp(regexpForSymbols, ignoreRegister ? "i" : "").test(value[point])));
    } else {
      // Проверка всего значения
      // Происходит в случае, если в объекте options нет start, end и points
      rules.push(new RegExp(defaultRegexp, ignoreRegister ? "i" : "", "g").test(value));
    }
  } else if (isBoolean(options)) {
    rules.push(new RegExp(defaultRegexp, "g").test(value));
  }

  return rules;
};