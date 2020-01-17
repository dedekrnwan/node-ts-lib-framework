import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class NotAcceptableException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 406
        this.message = context.message || 'Not Acceptable'
        this.error = context.error || null
    }
}