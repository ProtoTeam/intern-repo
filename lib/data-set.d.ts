import { Data } from './types';
import { Query } from './query';
/** 前端数据集模块 */
export declare class DataSet {
    private data;
    constructor(data: Data);
    /**
     * 数据大小
     */
    size(): number;
    /**
     * 数据集的字段原信息（暂不处理）
     */
    meta(): any;
    /**
     * 开始数据查询
     */
    query(): Query;
}
