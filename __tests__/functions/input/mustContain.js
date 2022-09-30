import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="123 $! 321" />
      <input class="ex-1" type="text" value="N1234 5678 9012 3456">
      <input class="ex-2" type="text" value="@@">
      <input class="ex-3" type="text" value="12345">
      <input class="ex-4" type="text" value="@@@ @@@">
    </div>
  `;

  const tests = [
    {
      element: document.querySelector(".ex-1"),
      args: [{
        numbers: {
          start: [1, 6, 11, 16],
          end: [4, 9, 14, 19],
        },
        spaces: { points: [5, 10, 15], },
        other: {
            n: {
                points: [0],
                ignoreRegister: true,
            },
        },
      }],
      testMethod: {
        name: "toBeTruthy",
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
        name: "toBeTruthy",
        args: [],
      },
    },
    {
      element: document.querySelector(".ex-3"),
      args: [{ numbers: { amount: 6, }, }],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    },
    {
      element: document.querySelector(".ex-4"),
      args: [{
        other: {
          "@": {
            amount: 2,
            length: 3,
          },
        },
        spaces: true,
      }],
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
        return Verificateur(element).mustContain(...args);
      },
    };
  });
};