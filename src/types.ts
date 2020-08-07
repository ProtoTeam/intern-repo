/** 一条数据 */
export type Datum = Record<string, any>;

/** 多条数据 */
export type Data = Datum[];

/**
 * 聚合字段描述信息（可以无聚合 raw）
 */
export type Field = {
  /** 聚合函数 */
  readonly aggregate: 'sum' | 'max' | 'min' | 'raw'; // 可扩展
  /** 字段名 */
  readonly field: string;
};

export type Order = {
  order?: 'asc' | 'desc';
  orderBy?: string;
};

export type Options = {
  select?: Field[];
  orders?: Order[];
  limit?: number;
  gKey?: string;
};

export type Groups = Map<string, Data>;
