import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class PayloadTooLargeException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 413
        this.message = context.message || 'Payload Too Large'
        context ? this.error = context : null
    }
}