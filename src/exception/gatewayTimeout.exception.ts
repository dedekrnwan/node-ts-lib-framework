import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class GatewayTimeoutException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 504
        this.message = context.message || 'Gateway Timeout'
        this.error = context.error || null
    }
}