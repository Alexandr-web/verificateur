import { test, describe, } from "@jest/globals";
import testHandler from "../handlers/dom";
import { weightLimit, mustContainType, limitedAmount, } from "../functions/file/index";

describe("File tests", () => {
  test("weightLimit", () => testHandler(weightLimit()));
  test("mustContainType", () => testHandler(mustContainType()));
  test("limitedAmount", () => testHandler(limitedAmount()));
});