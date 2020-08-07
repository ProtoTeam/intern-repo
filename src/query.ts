import { Data, Field } from './types';
import { map, groupBy, orderBy, isEmpty, pick, max, forIn, maxBy, sumBy, minBy} from 'lodash'

export class Query {

  private data
  // select 数据 ['id', 'score']
  private _select = [];
  // 排序字段 { fields : 'score', asc : true}
  private _orderby;
  // 分组字段 'subject'
  private _groupby;
  // 存储分组
  private _groupColumn;
  // 取条数 2
  private _limit;
  // 计算字段 { aggregate: 'sum' field: 'score', }
  private _caculate;


  constructor(data: Data) {
    this.data = data;
  }

  /**
   * 选择字段
   * @param fields 
   */
  public select(...fields: Field[]): Query {
    map(fields, field => {
      // 找出计算值
      if(field.aggregate  !== 'raw'){
        this._caculate = field;
      }
      // 找出所有select值
      this._select.push(field.field);

    })
    return this;
  }

  /**
   * 按照字段排序 默认降序
   * @param field 
   * @param asc 
   */
  public orderBy(fields: string, asc?: boolean): Query {
    this._orderby = {
      fields,
      asc,
    }
    return this;
  }

  /**
   * 按照字段分组
   * @param asc 
   * @param fields 
   */
  public groupBy(fields: string): Query {
    this._groupby = fields
    return this;
  }

  /**
   * 取 n 条数据
   * @param n 
   */
  public limit(n: number): Query {
    this._limit = n;
    return this;
  }

/**
   * 计算分组聚合信息
   * @param data 分组数组
   * @param field 聚合字段
   * @param data 聚合条件
   */
  public caculate(data:[], field: string, operator: string) {
    switch (operator) {
      case 'sum':
        return {
          field: sumBy(data, field)
        };
      case 'min':
        return minBy(data, field);
      case 'max':
        return maxBy(data, field);
    }
  }

  /**
   * 返回最后的查询数据
   */
  public record(): Data {
    // 处理分组
    if(this._groupby) this._groupColumn = groupBy(this.data, this._groupby);

    // 处理求值 max min sum
    if(this._caculate) {
      // max
      let type = this._caculate.aggregate;
      // score
      let field = this._caculate.field;
      if(this._groupColumn){
        this.data = [];
        forIn(this._groupColumn, (item) => {
          this.data.push(this.caculate(item, field, type));
        })
      }else{
        // 当不存在分组的时候，处理原始数据 只有一条数据
          this.data =[this.caculate(this.data, field, type)];
      }
    }

    //处理排序
    if(this._orderby) this.data = orderBy(this.data, this._orderby.fields, this._orderby.asc );

    //处理 limit
    if(this._limit) this.data = this.data.slice(0, this._limit);

    //处理select ['id', 'score']
    if(!isEmpty(this._select)) {
      this.data = map(this.data, (item) =>  pick(item, this._select) );
    }

    return this.data;
  }
}