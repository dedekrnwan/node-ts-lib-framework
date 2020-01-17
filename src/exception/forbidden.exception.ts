import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class ForbiddenException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 403
        this.message = context.message || 'Forbidden'
        this.error = context.error || null
    }
}