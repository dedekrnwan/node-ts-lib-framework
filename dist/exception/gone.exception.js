"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("./http.exception"));
class GoneException extends http_exception_1.default {
    constructor(context) {
        super(context);
        this.code = context.code || 410;
        this.message = context.message || 'Gone Timeout';
        this.error = context.error || null;
    }
}
exports.default = GoneException;
