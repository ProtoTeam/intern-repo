/**
 * 聚合求和
 * @param field
 */
export function SUM(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
/**
 * 聚合 MAX
 * @param field
 */
export function MAX(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
/**
 * 聚合 MIN
 * @param field
 */
export function MIN(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
/**
 * 无聚合字段
 * @param field
 */
export function RAW(field) {
    return {
        aggregate: 'raw',
        field: field,
    };
}
//# sourceMappingURL=field.js.map