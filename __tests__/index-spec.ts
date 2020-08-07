import { DataSet, MAX, RAW } from '../src/index';

const data = [
  { id: 'A', gender: 'M', subject: 'chinese', score: 99 },
  { id: 'B', gender: 'M', subject: 'english', score: 90 },
  { id: 'C', gender: 'F', subject: 'english', score: 60 },
  { id: 'D', gender: 'F', subject: 'chinese', score: 80 },
];

const ds = new DataSet(data);
describe('query', () => {
  test('query', () => {
    expect(ds.query().select(RAW('id'), MAX('score'), RAW('gender')).groupBy('subject').record()).toEqual([
      { id: 'A', gender: 'M', score: 99 },
      { id: 'B', gender: 'M', score: 90 },
    ]);
    expect(ds.query().select(RAW('id'), RAW('gender'), RAW('subject'), RAW('score')).orderBy('score', true).limit(2).record()).toEqual([
      { id: 'C', gender: 'F',subject: 'english', score:60},
      { id: 'D', gender: 'F', subject: 'chinese', score: 80 },
    ]);
  });
});
