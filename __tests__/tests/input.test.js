import { expect, test, describe, } from "@jest/globals";
import { between, } from "../functions/input/index";

describe("Input tests", () => {
  test("between", () => {
    between().map(({ testMethod, setParams, isError, }) => {
      if (isError) {
        expect(() => { setParams(); })[testMethod.name](...testMethod.args);
      } else {
        expect(setParams())[testMethod.name](...testMethod.args);
      }
    });
  });
});