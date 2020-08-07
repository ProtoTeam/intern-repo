"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSet = void 0;
var tslib_1 = require("tslib");
var _ = tslib_1.__importStar(require("lodash"));
var query_1 = require("./query");
/** 前端数据集模块 */
var DataSet = /** @class */ (function () {
    function DataSet(data) {
        this.data = [];
        this.data = data;
    }
    /**
     * 数据大小
     */
    DataSet.prototype.size = function () {
        return this.data.length;
    };
    /**
     * 数据集的字段原信息（暂不处理）
     */
    DataSet.prototype.meta = function () {
        return _.uniq(Object.keys(this.data));
    };
    /**
     * 开始数据查询
     */
    DataSet.prototype.query = function () {
        return new query_1.Query(this.data);
    };
    return DataSet;
}());
exports.DataSet = DataSet;
//# sourceMappingURL=data-set.js.map