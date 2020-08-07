import { MAX } from '../src';

describe('data-set', () => {
  it('#1', () => {
    expect(MAX('f')).toEqual({
      aggregate: 'max',
      field: 'f',
    });
  });
});