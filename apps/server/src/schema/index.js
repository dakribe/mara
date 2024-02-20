"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const core_1 = __importDefault(require("@pothos/core"));
const builder = new core_1.default({});
builder.queryType({
    fields: (t) => ({
        hello: t.string({
            resolve: () => 'world',
        }),
    }),
});
exports.schema = builder.toSchema();
