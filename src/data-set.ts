import * as _ from 'lodash';
import { Data } from './types';
import { Query } from './query';

/** 前端数据集模块 */
export class DataSet {
  private data = [];

  constructor(data: Data) {
    this.data = data;
  }

  /**
   * 数据大小
   */
  public size() {
    return this.data.length;
  }

  /**
   * 数据集的字段原信息（暂不处理）
   */
  public meta() {
    return _.uniq(Object.keys(this.data));
  }

  /**
   * 开始数据查询
   */
  public query() {
    return new Query(this.data);
  }
}
