import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 1;
    const expected = value;

    await expect(resolveValue(value)).resolves.toBe(expected);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Error message';
    const expected = new Error(message);
    const result = () => throwError(message);

    expect(result).toThrow(expected);
  });

  test('should throw error with default message if message is not provided', () => {
    const message = 'Oops!';
    const expected = new Error(message);
    const result = () => throwError();

    expect(result).toThrow(expected);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const message = 'This is my awesome custom error!';
    const expected = new MyAwesomeError();
    const result = () => throwCustomError();

    expect(result).toThrow(message);
    expect(result).toThrow(expected);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const message = 'This is my awesome custom error!';
    const expected = new MyAwesomeError();

    await expect(rejectCustomError()).rejects.toThrow(message);
    await expect(rejectCustomError()).rejects.toThrow(expected);
  });
});
