import { map, groupBy, orderBy, isEmpty, pick, forIn, maxBy, sumBy, minBy } from 'lodash';
var Query = /** @class */ (function () {
    function Query(data) {
        // select 数据 ['id', 'score']
        this._select = [];
        this.data = data;
    }
    /**
     * 选择字段
     * @param fields
     */
    Query.prototype.select = function () {
        var _this = this;
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        map(fields, function (field) {
            // 找出计算值
            if (field.aggregate !== 'raw') {
                _this._caculate = field;
            }
            // 找出所有select值
            _this._select.push(field.field);
        });
        return this;
    };
    /**
     * 按照字段排序 默认降序
     * @param field
     * @param asc
     */
    Query.prototype.orderBy = function (fields, asc) {
        this._orderby = {
            fields: fields,
            asc: asc,
        };
        return this;
    };
    /**
     * 按照字段分组
     * @param asc
     * @param fields
     */
    Query.prototype.groupBy = function (fields) {
        this._groupby = fields;
        return this;
    };
    /**
     * 取 n 条数据
     * @param n
     */
    Query.prototype.limit = function (n) {
        this._limit = n;
        return this;
    };
    /**
     * 计算分组聚合信息
     * @param data 分组数组
     * @param field 聚合字段
     * @param data 聚合条件
     */
    Query.prototype.caculate = function (data, field, operator) {
        switch (operator) {
            case 'sum':
                return {
                    field: sumBy(data, field),
                };
            case 'min':
                return minBy(data, field);
            case 'max':
                return maxBy(data, field);
        }
    };
    /**
     * 返回最后的查询数据
     */
    Query.prototype.record = function () {
        var _this = this;
        // 处理分组
        if (this._groupby)
            this._groupColumn = groupBy(this.data, this._groupby);
        // 处理求值 max min sum
        if (this._caculate) {
            // max
            var type_1 = this._caculate.aggregate;
            // score
            var field_1 = this._caculate.field;
            if (this._groupColumn) {
                this.data = [];
                forIn(this._groupColumn, function (item) {
                    _this.data.push(_this.caculate(item, field_1, type_1));
                });
            }
            else {
                // 当不存在分组的时候，处理原始数据 只有一条数据
                this.data = [this.caculate(this.data, field_1, type_1)];
            }
        }
        //处理排序
        if (this._orderby)
            this.data = orderBy(this.data, this._orderby.fields, this._orderby.asc);
        //处理 limit
        if (this._limit)
            this.data = this.data.slice(0, this._limit);
        //处理select ['id', 'score']
        if (!isEmpty(this._select)) {
            this.data = map(this.data, function (item) { return pick(item, _this._select); });
        }
        return this.data;
    };
    return Query;
}());
export { Query };
//# sourceMappingURL=query.js.map