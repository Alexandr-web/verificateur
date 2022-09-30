import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="123 $! 321" />
      <input class="ex-1" type="text" value="12!3!456" />
      <input class="ex-2" type="text" value="$12345 $" />
    </div>
  `;

  const tests = [
    {
      element: document.querySelector(".ex-2"),
      args: [{
        numbers: { amount: 5, },
        spaces: { amount: 1, },
        other: { "\\$": { amount: 2, }, },
      }],
      testMethod: {
        name: "toBeTruthy",
        args: [],
      },
    },
    {
      element: document.querySelector(".ex-1"),
      args: [{
        other: {
          "!": {
            ignoreRegister: true,
            amount: 2,
          },
        },
      }],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    },
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
        args: ["Argument must be of type object"],
      },
    },
    {
      element: document.querySelector("input"),
      args: [{
        numbers: {
          start: [0, 7],
          end: [2, 9],
        },
        spaces: { points: [3, 6], },
        other: { "\\$": true, "!": true, },
      }],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    }
  ];

  return tests.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return Verificateur(element).mustNotContain(...args);
      },
    };
  });
};