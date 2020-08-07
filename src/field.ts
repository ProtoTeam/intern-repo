import { Field } from './types';

/**
 * 聚合求和
 * @param field
 */
export function SUM(field: string): Field {
  return {
    aggregate: 'sum',
    field,
  };
}

/**
 * 聚合 MAX
 * @param field
 */
export function MAX(field: string): Field {
  return {
    aggregate: 'sum',
    field,
  };
}

/**
 * 聚合 MIN
 * @param field
 */
export function MIN(field: string): Field {
  return {
    aggregate: 'sum',
    field,
  };
}

/**
 * 无聚合字段
 * @param field
 */
export function RAW(field: string): Field {
  return {
    aggregate: 'raw',
    field,
  };
}
