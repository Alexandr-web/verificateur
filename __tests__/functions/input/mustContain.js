import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="123 $! 321" />
      <input class="ex-1" type="text" value="N1234 5678 9012 3456">
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
        other: { $: true, "!": true, },
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