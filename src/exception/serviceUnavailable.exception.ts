import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class ServiceUnavailableException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 503
        this.message = context.message || 'Service Unavailable'
        this.error = context.error || null
    }
}