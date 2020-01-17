"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(context) {
        this.code = context.code || 200;
        this.message = context.message || 'Ok';
        this.data = context.data || null;
    }
}
exports.default = HttpResponse;
