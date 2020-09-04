import { Query } from '../src/query';

describe('query', () => {
  test('query', () => {
    const q = new Query([]);
    expect(q.record()).toEqual([]);
  });
});
