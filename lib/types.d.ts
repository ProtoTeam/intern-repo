/** 一条数据 */
export declare type Datum = Record<string, any>;
/** 多条数据 */
export declare type Data = Datum[];
/**
 * 聚合字段描述信息（可以无聚合 raw）
 */
export declare type Field = {
    /** 聚合函数 */
    readonly aggregate: 'sum' | 'max' | 'max' | 'raw';
    /** 字段名 */
    readonly field: string;
};
