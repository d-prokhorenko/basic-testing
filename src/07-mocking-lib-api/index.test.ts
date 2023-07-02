import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Title' } }),
    });

    await throttledGetDataFromApi('/path');

    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Title' } }),
    });

    await throttledGetDataFromApi('/path');

    jest.runAllTimers();

    const axiosInstance = axios.create();

    expect(axiosInstance.get).toBeCalledWith('/path');
  });

  test('should return response data', async () => {
    const expected = { id: 1, title: 'Title' };

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: expected }),
    });

    const result = await throttledGetDataFromApi('/path');

    expect(result).toBe(expected);
  });
});
