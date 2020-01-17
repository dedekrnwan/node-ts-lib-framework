import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class BadGatewayException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 501
        this.message = context.message || 'Bad gateway'
        this.error = context.error || null
    }
}