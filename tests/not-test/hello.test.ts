import { helloWorld } from './hello';

describe('Testing Hello', () => {
  test('Not Pass', () => {
    expect(helloWorld('jest')).toBe('Hello jest');
  });

  test('Pass', async () => {
    const str = await helloWorld('Jest');
    expect(str).toBe('Hello Jest');
  });
})