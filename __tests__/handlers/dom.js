import { expect, } from "@jest/globals";

export default (tests) => {
  tests.map(({ testMethod, setParams, isError, }) => {
    if (isError) {
      expect(() => { setParams(); })[testMethod.name](...testMethod.args);
    } else {
      expect(setParams())[testMethod.name](...testMethod.args);
    }
  });
};