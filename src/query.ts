import * as _ from 'lodash';
import { Data, Field } from './types';

export class Query {

  private data;
  private dataGroup;
  private fileds;

  constructor(data: Data) {
    this.data = data;
    this.dataGroup = { data };
    this.fileds = [];
  }

  /**
   * 选择字段
   * @param fields 
   */
  public select(...fields: Field[]): Query {
    this.fileds = [
      ...this.fileds,
      ...fields,
    ];

    return this;
  }

  /**
   * 按照字段排序
   * @param field 
   * @param asc 
   */
  public orderBy(fields: string, asc?: boolean): Query {
    for (const fileds in this.dataGroup) {
      if (typeof this.dataGroup[fields][0][fields] === 'number') {
        this.dataGroup[fields].sort((item1, item2) => asc ? item1 > item2 : item1 < item2);
      } else {
        this.dataGroup[fields].sort();
      }
    }
    
    
    return this;
  }

  /**
   * 按照字段分组
   * @param asc 
   * @param fields 
   */
  public groupBy(fields: string): Query {
    const tempMap = {};
    this.data.forEach(item => {
      if (!tempMap[item[fields]]) {
        tempMap[item[fields]] = [];
      }
      tempMap[item[fields]].push(item);
    })

    this.dataGroup = tempMap;
    
    return this;
  }

  /**
   * 取 n 条数据
   * @param n 
   */
  public limit(n: number): Query {
    for (const fileds in this.dataGroup) {
      const groupData = this.dataGroup[fileds];
      this.dataGroup[fileds] = groupData.slice(0, n);
    }
    
    return this;
  }

  /**
   * 返回最后的查询数据
   */
  public record(): Data {
    const res = [];
    for (const group of this.dataGroup.values()) {
      const groupData = group.reduce((data, item) => {
        const itemData = {};
        for (const key in item) {
          if (this.fileds.includes(key)) {
            itemData[key] = item[key];
          }
        }
        data.push(itemData);
        return data;
      }, []);
      res.push(groupData);
    }

    return res;
  }
}
