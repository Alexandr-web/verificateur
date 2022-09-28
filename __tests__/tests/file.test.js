import { test, describe, } from "@jest/globals";
import testHandler from "../testHandler";
import { weightLimit, mustContainType, limitedQuantity, } from "../functions/file/index";

describe("File tests", () => {
  test("weightLimit", () => testHandler(weightLimit()));
  test("mustContainType", () => testHandler(mustContainType()));
  test("limitedQuantity", () => testHandler(limitedQuantity()));
});