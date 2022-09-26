import { test, describe, } from "@jest/globals";
import testHandler from "../testHandler";
import { weightLimit, } from "../functions/file/index";

describe("File tests", () => {
  test("weightLimit", () => testHandler(weightLimit()));
});