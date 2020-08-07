import { Data, Field } from './types';
export declare class Query {
    private data;
    private _select;
    private _orderby;
    private _groupby;
    private _groupColumn;
    private _limit;
    private _caculate;
    constructor(data: Data);
    /**
     * 选择字段
     * @param fields
     */
    select(...fields: Field[]): Query;
    /**
     * 按照字段排序 默认降序
     * @param field
     * @param asc
     */
    orderBy(fields: string, asc?: boolean): Query;
    /**
     * 按照字段分组
     * @param asc
     * @param fields
     */
    groupBy(fields: string): Query;
    /**
     * 取 n 条数据
     * @param n
     */
    limit(n: number): Query;
    /**
     * 计算分组聚合信息
     * @param data 分组数组
     * @param field 聚合字段
     * @param data 聚合条件
     */
    caculate(data: [], field: string, operator: string): any;
    /**
     * 返回最后的查询数据
     */
    record(): Data;
}
