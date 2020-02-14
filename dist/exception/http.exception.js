"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException {
    constructor(context) {
        this.code = context.code || 500;
        this.message = context.message || 'Internal Server Error';
        this.error = context.error || null;
    }
}
exports.default = HttpException;
