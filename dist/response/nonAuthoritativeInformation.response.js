"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_response_1 = __importDefault(require("./http.response"));
class NonAuthoritativeInformationResponse extends http_response_1.default {
    constructor(context) {
        super(context);
        this.code = context.code || 203;
        this.message = context.message || 'Non Authoritative Information';
        this.data = context.data || null;
    }
}
exports.default = NonAuthoritativeInformationResponse;
