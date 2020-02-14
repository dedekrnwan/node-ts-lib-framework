"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException {
    constructor(context) {
        if (context.code && Number.isInteger(context.code) && context.code < 600) {
            this.code = context.code;
        }
        else if (context.status && Number.isInteger(context.status) && context.status < 600) {
            this.code = context.status;
        }
        else {
            this.code = 500;
        }
        this.message = context.message || 'Internal Server Error';
        context ? this.error = context : null;
    }
}
exports.default = HttpException;
