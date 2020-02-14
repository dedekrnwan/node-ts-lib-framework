import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class NotImplementedException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 501
        this.message = context.message || 'Not implemented'
        context ? this.error = context : null
    }
}