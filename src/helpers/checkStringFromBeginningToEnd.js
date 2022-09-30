import isObject from "./isObject";
import isBoolean from "./isBoolean";

export default (options, defaultRegexp, regexpForSymbols, value) => {
  // Массив, куда записываются все проверки (содержит только булевы значения)
  const rules = [];

  if (isObject(options)) {
    const { start = [], end = [], points = [], } = options;
    if (start.length && start.length && start.length === end.length) {
      // Проверка символов, входящих в диапазон от num до end[index]
      start.map((num, index) => {
        for (let i = num; i <= end[index]; i++) {
          rules.push(regexpForSymbols.test(value[i]));
        }
      });
    } else if (points.length) {
      // Проверка символов по индексу
      points.map((point) => rules.push(regexpForSymbols.test(value[point])));
    } else {
      // Проверка всего значения
      // Происходит в случае, если в объекте options нет start, end и points
      rules.push(defaultRegexp.test(value));
    }
  } else if (isBoolean(options) && options) {
    rules.push(defaultRegexp.test(value));
  }

  return rules;
};