import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const delay = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, delay);

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const delay = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, delay);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const delay = 1000;
    const callback = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, delay);

    expect(setInterval).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const delay = 1000;
    const callback = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, delay);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously('test.txt');

    expect(pathSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const content = await readFileAsynchronously('test.txt');

    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsp, 'readFile')
      .mockResolvedValue({ toString: () => 'content' } as Buffer);

    const content = await readFileAsynchronously('test.txt');

    expect(content).toBe('content');
  });
});
