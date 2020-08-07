"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAW = exports.MIN = exports.MAX = exports.SUM = void 0;
/**
 * 聚合求和
 * @param field
 */
function SUM(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
exports.SUM = SUM;
/**
 * 聚合 MAX
 * @param field
 */
function MAX(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
exports.MAX = MAX;
/**
 * 聚合 MIN
 * @param field
 */
function MIN(field) {
    return {
        aggregate: 'sum',
        field: field,
    };
}
exports.MIN = MIN;
/**
 * 无聚合字段
 * @param field
 */
function RAW(field) {
    return {
        aggregate: 'raw',
        field: field,
    };
}
exports.RAW = RAW;
//# sourceMappingURL=field.js.map