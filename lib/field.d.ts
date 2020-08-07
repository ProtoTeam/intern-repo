import { Field } from './types';
/**
 * 聚合求和
 * @param field
 */
export declare function SUM(field: string): Field;
/**
 * 聚合 MAX
 * @param field
 */
export declare function MAX(field: string): Field;
/**
 * 聚合 MIN
 * @param field
 */
export declare function MIN(field: string): Field;
/**
 * 无聚合字段
 * @param field
 */
export declare function RAW(field: string): Field;
