import { simpleCalculator, Action, RawCalculatorInput } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = 3;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Add,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should subtract two numbers', () => {
    const res = -1;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Subtract,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should multiply two numbers', () => {
    const res = 2;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Multiply,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should divide two numbers', () => {
    const res = 0.5;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Divide,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should exponentiate two numbers', () => {
    const res = 1;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Exponentiate,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should return null for invalid action', () => {
    const res = null;
    const funcArguments: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: 'invalid',
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });

  test('should return null for invalid arguments', () => {
    const res = null;
    const funcArguments: RawCalculatorInput = {
      a: '1',
      b: '2',
      action: Action.Add,
    };

    expect(simpleCalculator(funcArguments)).toBe(res);
  });
});
