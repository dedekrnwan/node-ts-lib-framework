"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_1 = __importDefault(require("./http.response"));
class OkResponse extends http_response_1.default {
    constructor(context) {
        super(context);
        this.code = context.code || 200;
        this.message = context.message || 'Ok';
        this.data = context.data || null;
    }
}
exports.default = OkResponse;
