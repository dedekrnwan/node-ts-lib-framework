import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class UnAuthorizedException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 401
        this.message = context.message || 'UnAuthorized'
        this.error = context.error || null
    }
}