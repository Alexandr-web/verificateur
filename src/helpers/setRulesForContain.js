import isObject from "./isObject";
import isArray from "./isArray";
import isString from "./isString";
import checkStringFromBeginningToEnd from "./checkStringFromBeginningToEnd";
import getRegexpsFromOptions from "./getRegexpsFromOptions";

export default (options, value) => {
  // Массив, куда записываются все проверки (содержит только булевы значения)
  let rules = [];
  const { numbers, spaces, other, } = options;

  if (numbers) {
    const { defaultRegexp, regexpForSymbols, amountIsMatch, } = getRegexpsFromOptions(numbers, "\\d", value);

    rules = rules.concat(checkStringFromBeginningToEnd(numbers, defaultRegexp, regexpForSymbols, value));

    if (amountIsMatch !== undefined) {
      rules.push(amountIsMatch);
    }
  }

  if (spaces) {
    const { defaultRegexp, regexpForSymbols, amountIsMatch, } = getRegexpsFromOptions(spaces, "\\s", value);

    rules = rules.concat(checkStringFromBeginningToEnd(spaces, defaultRegexp, regexpForSymbols, value));

    if (amountIsMatch !== undefined) {
      rules.push(amountIsMatch);
    }
  }

  if (other) {
    if (isObject(other)) {
      // Каждый ключ - отдельный символ
      Object.keys(other).map((key) => {
        const { defaultRegexp, regexpForSymbols, amountIsMatch, } = getRegexpsFromOptions(other[key], key, value);

        rules = rules.concat(checkStringFromBeginningToEnd(other[key], defaultRegexp, regexpForSymbols, value));

        if (amountIsMatch !== undefined) {
          rules.push(amountIsMatch);
        }
      });
    }

    if (isArray(other)) {
      other.map((symbol) => {
        if (isString(symbol)) {
          rules.push(value.includes(symbol));
        }
      });
    }
  }

  // Все ли правила были соблюдены
  return rules.every(Boolean);
};