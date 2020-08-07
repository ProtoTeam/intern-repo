import { Data, Field, Options, Order, Datum, Groups } from "./types";
import _ from "lodash";

export class Query {
  private data: Data;

  private options: Options;

  constructor(data: Data) {
    this.data = data;
    this.options = {};
  }

  /**
   * 选择字段
   * @param fields
   */
  public select(...fields: Field[]): Query {
    this.options = {
      ...this.options,
      select: fields,
    };

    return this;
  }

  /**
   * 按照字段排序
   * @param field
   * @param asc
   */
  public orderBy(fields: string, asc?: boolean): Query {
    const order: Order = { order: asc ? "asc" : "desc", orderBy: fields };

    this.options = {
      ...this.options,
      orders: [...this.options.orders, order],
    };

    return this;
  }

  /**
   * 按照字段分组
   * @param asc
   * @param fields
   */
  public groupBy(fields: string): Query {
    this.options = {
      ...this.options,
      gKey: fields,
    };

    return this;
  }

  /**
   * 取 n 条数据
   * @param n
   */
  public limit(n: number): Query {
    this.options = {
      ...this.options,
      limit: n,
    };

    return this;
  }

  /**
   * 返回最后的查询数据
   */
  public record(): Data {
    const { select, orders, limit, gKey } = this.options;

    const agg = select.find((e) => e.aggregate !== "raw");

    if (!agg) {
      return _.orderBy(
        this.data,
        orders.map((e) => e.orderBy),
        orders.map((e) => e.order)
      );
    }

    const groups: Groups = new Map();
    this.data.forEach((datum) => {
      const gVal = datum[gKey];
      if (!groups.has(gVal)) {
        groups.set(gVal, []);
      }
      groups.set(gVal, [...groups.get(gVal), datum]);
    });

    const res = [];
    groups.forEach(([gv, data]: [any, Data]) => {
      switch (agg.field) {
        case 'max': {
          const target = _.maxBy(data, (r) => r[agg.field]);
          res.push(target);
          break;
        }
        case 'min': {
          const target = _.minBy(data, (r) => r[agg.field]);
          res.push(target);
          break;
        }
        default:
      }

    });

    return _.orderBy(
      res,
      orders.map((e) => e.orderBy),
      orders.map((e) => e.order)
    );;
  }
}
