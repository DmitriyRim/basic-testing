// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 6, action: Action.Add, expected: 11 },
  { a: 5, b: 6, action: Action.Subtract, expected: -1 },
  { a: 5, b: 6, action: Action.Multiply, expected: 30 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 5, b: 6, action: Action.Exponentiate, expected: 15625 },
  { a: 6, b: 6, action: '%', expected: null },
  { a: 6, b: '6', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should return $expected, action: "$action"', (data) => {
    expect(simpleCalculator(data)).toBe(data.expected);
  });
});
