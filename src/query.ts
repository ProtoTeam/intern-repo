import * as _ from 'lodash';
import { Data, Field, OrderBy, Datum } from './types';
import { ID_COLUMN } from './const';

export class Query {

  /** 原始数据 */
  private data: Data = [];

  private selectOption: Field[] = [];
  private orderByOption: OrderBy = {};
  private groupByOption: string;
  private limitOption: number = 10;

  constructor(data: Data) {
    this.data = this.generateUniqueId(data);
  }

  /**
   * 给每个数据设置唯一 id
   */
  private generateUniqueId(data: Data) {
    return _.map(data, (d: Datum) => {
      return { ...d,  [ID_COLUMN]: _.uniqueId() };
    });
  }

  /**
   * 选择字段
   * @param fields 
   */
  public select(...fields: Field[]): Query {
    this.selectOption = fields;

    return this;
  }

  /**
   * 按照字段排序
   * @param field 
   * @param asc 
   */
  public orderBy(field: string, asc?: boolean): Query {
    this.orderByOption = {
      field,
      asc,
    };
    
    return this;
  }

  /**
   * 按照字段分组
   * @param asc 
   * @param field
   */
  public groupBy(field: string): Query {
    this.groupByOption = field;

    return this;
  }

  /**
   * 取 n 条数据
   * @param n 
   */
  public limit(n: number): Query {
    this.limitOption = n;
    
    return this;
  }

  /**
   * 返回最后的查询数据
   */
  public record(): Data {
    const { data, selectOption, groupByOption, orderByOption, limitOption } = this;
    
    const r = _(data);

    // 1. 执行分组
    r.groupBy(groupByOption ? groupByOption : ID_COLUMN);

    // 2. 执行 select
    const fields = _.map(selectOption, (f: Field) => f.field));
    r.mapValues((v: Data, k: string) => {
      // 1. 执行所有的 fields
      const aggr = _.filter(selectOption, (f: Field) => f.aggregate !== 'raw');
      const noneAggr = _.filter(selectOption, (f: Field) => f.aggregate === 'raw');

      let record;
      // 有聚合
      if (aggr.length) {
        // 按照 max 字段取去最大
        record = _.maxBy(v, _.find(aggr, (f: Field) => f.aggregate === 'max').field);
        record = record ? [record] : [];
        
      } else {
        // 无聚合
        record = v; 
      }

      // 只取这些字段
      return _.map(record, (d: Datum) => _.pick(d, fields));
    });

    // 打平
    r.flatten();

    // 3. 执行 order by
    if (orderByOption) {
      r.sortBy((d: Datum) => d[orderByOption.field]); // 升降序 
    }

    // 4. 执行 limit
    if (limitOption) {
      r.slice(0, limitOption);
    }

    return r.values();
  }
}