import { simpleCalculator, Action, RawCalculatorInput } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const expected = 3;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const expected = -1;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Subtract,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const expected = 2;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Multiply,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should divide two numbers', () => {
    const expected = 0.5;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Divide,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const expected = 1;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const expected = null;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: 'invalid',
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });

  test('should return null for invalid arguments', () => {
    const expected = null;
    const funcArguments: RawCalculatorInput = {
      a: '1',
      b: '2',
      action: Action.Add,
    };
    const result = simpleCalculator(funcArguments);

    expect(result).toBe(expected);
  });
});
