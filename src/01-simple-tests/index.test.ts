// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 5;
    const b = 6;
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(11);
  });

  test('should subtract two numbers', () => {
    const a = 5;
    const b = 6;
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const a = 5;
    const b = 6;
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(30);
  });

  test('should divide two numbers', () => {
    const a = 6;
    const b = 3;
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const a = 5;
    const b = 6;
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(15625);
  });

  test('should return null for invalid action', () => {
    const a = 6;
    const b = 6;
    expect(simpleCalculator({ a, b, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const a = 5;
    const b = '6';
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBeNull();
  });
});
