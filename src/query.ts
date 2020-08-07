import { Data, Field } from './types';
import _ from 'lodash';

export class Query {
  private data;

  public options = {
    select: undefined,
    orderBy: undefined,
    groupBy: undefined,
    limit: undefined,
  };

  constructor(data: Data) {
    this.data = data;
  }

  /**
   * 选择字段
   * @param fields
   */
  public select(...fields: Field[]): Query {
    // TODO
    this.options.select = {};
    this.options.select.fields = [];
    fields.map((field) => {
      this.options.select.fields.push(field);
      if (field.aggregate !== 'raw') {
        this.options.select = {
          union: true,
          unionField: field.aggregate,
        };
      } else {
        // ...
      }
    });

    return this;
  }

  /**
   * 按照字段排序
   * @param field
   * @param asc
   */
  public orderBy(field: string, asc?: boolean): Query {
    // TODO
    this.options.orderBy = {
      field,
      asc: asc ? 'desc' : 'asc',
    };

    return this;
  }

  /**
   * 按照字段分组
   * @param asc
   * @param fields
   */
  public groupBy(fields: string): Query {
    // TODO
    this.options.groupBy = fields;

    return this;
  }

  /**
   * 取 n 条数据
   * @param n
   */
  public limit(n: number): Query {
    // TODO
    this.options.limit = n;

    return this;
  }

  /**
   * 返回最后的查询数据
   */
  public record(): Data {
    const filter = (array, func) => {
      const filterArray = [];
      array.map((item) => {
        if (func(item)) {
          filterArray.push(item);
        }
      });
      return filterArray;
    };

    const selectVal = (data, field) => {
      const uniqueFilterNames = Array.from(new Set(data.map((item) => item[field])));
      return uniqueFilterNames.map((name) =>
        filter(data, (item) => {
          item[field] === name;
        })
      );
    };

    // TODO

    console.log(this);

    let data = this.data;

    // 先处理orderBy
    if (!_.isEmpty(this.options.orderBy)) {
      const { field, asc } = this.options.orderBy;
      if (asc === 'asc') {
        data.sort((a, b) => {
          return a[field] - b[field];
        });
      } else {
        data.sort((a, b) => {
          return b[field] - a[field];
        });
      }
    }

    // 再处理groupBy
    if (!_.isEmpty(this.options.groupBy)) {
      const fields = this.options.groupBy.fields;
      fields.map((field) => {
        data = [].concat(selectVal(data, field));
      });
    }

    return data;
  }
}
