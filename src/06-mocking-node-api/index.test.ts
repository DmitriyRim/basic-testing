// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path', () => {
  const originalModule = jest.requireActual<typeof import('path')>('path');
  return {
    ...originalModule,
    join: jest.fn(),
  };
});

jest.mock('fs', () => {
  const originalModule = jest.requireActual<typeof import('fs')>('fs');
  return {
    ...originalModule,
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const originalModule =
    jest.requireActual<typeof import('fs/promises')>('fs/promises');
  return {
    ...originalModule,
    readFile: jest.fn(),
  };
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
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
    const callback = jest.fn();
    const timeout = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);
    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './files';
    console.log(readFile, existsSync);
    (join as jest.Mock).mockReturnValue('.');

    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './files';

    (existsSync as jest.Mock).mockReturnValue(false);
    expect(await readFileAsynchronously(pathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './files';
    const textContent = 'i love read file';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(textContent);
    expect(await readFileAsynchronously(pathToFile)).toBe(textContent);
  });
});
