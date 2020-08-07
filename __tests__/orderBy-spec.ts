import { DataSet } from '../src/index';

const data = [
  { id: 'A', gender: 'M', subject: 'chinese', score: 99 },
  { id: 'B', gender: 'M', subject: 'english', score: 90 },
  { id: 'C', gender: 'F', subject: 'english', score: 60 },
  { id: 'D', gender: 'F', subject: 'chinese', score: 80 },
];

describe('orderBy', () => {
  it('pure orderBy', () => {
    const ds = new DataSet(data);
    const value = ds.query().orderBy('score', true).record();
    expect(value).toEqual([
      { id: 'A', gender: 'M', subject: 'chinese', score: 99 },
      { id: 'B', gender: 'M', subject: 'english', score: 90 },
      { id: 'D', gender: 'F', subject: 'chinese', score: 80 },
      { id: 'C', gender: 'F', subject: 'english', score: 60 },
    ]);
  });
});
