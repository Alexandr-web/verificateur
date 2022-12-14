import { test, describe, } from "@jest/globals";
import testHandler from "../handlers/dom";
import {
  between,
  onlyLetters,
  onlyNumbers,
  isEmail,
  hasLetters,
  hasNumbers,
  isEmpty,
  beginWith,
  endWith,
  minLength,
  maxLength,
  mustContain,
  toBe,
  isDate,
  isUrl,
  mustNotContain,
  contains,
  isBetween,
} from "../functions/input/index";

describe("Input tests", () => {
  test("between", () => testHandler(between()));
  test("onlyLetters", () => testHandler(onlyLetters()));
  test("onlyNumbers", () => testHandler(onlyNumbers()));
  test("isEmail", () => testHandler(isEmail()));
  test("hasLetters", () => testHandler(hasLetters()));
  test("hasNumbers", () => testHandler(hasNumbers()));
  test("isEmpty", () => testHandler(isEmpty()));
  test("beginWith", () => testHandler(beginWith()));
  test("endWith", () => testHandler(endWith()));
  test("minLength", () => testHandler(minLength()));
  test("maxLength", () => testHandler(maxLength()));
  test("mustContain", () => testHandler(mustContain()));
  test("toBe", () => testHandler(toBe()));
  test("isDate", () => testHandler(isDate()));
  test("isUrl", () => testHandler(isUrl()));
  test("mustNotContain", () => testHandler(mustNotContain()));
  test("contains", () => testHandler(contains()));
  test("isBetween", () => testHandler(isBetween()));
});