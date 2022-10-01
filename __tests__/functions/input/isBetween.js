import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="body and something" />
    </div>
  `;

  const tests = [
    {
      element: null,
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["The target must be an HTML element"],
      },
    },
    {
      element: document.querySelector("span"),
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["The target must be one of the following: input, textarea, select, datalist or output"],
      },
    },
    {
      element: document.querySelector("input"),
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["The first 3 arguments must be of type string"],
      },
    },
    {
      element: document.querySelector("input"),
      args: ["world", ", ", "!"],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    },
    {
      element: document.querySelector("input"),
      args: ["and", "body", "something", true],
      testMethod: {
        name: "toBeTruthy",
        args: [],
      },
    },
    {
      element: document.querySelector("input"),
      args: ["and", "body", "something"],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    },
    {
      element: document.querySelector("input"),
      args: ["anD", "bOdy", "SoMeThiNg", true, true],
      testMethod: {
        name: "toBeTruthy",
        args: [],
      },
    }
  ];

  return tests.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return Verificateur(element).isBetween(...args);
      },
    };
  });
};