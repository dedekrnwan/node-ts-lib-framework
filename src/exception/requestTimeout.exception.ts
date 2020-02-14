import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class RequestTimeoutException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 408
        this.message = context.message || 'Request Timeout'
        context ? this.error = context : null
    }
}