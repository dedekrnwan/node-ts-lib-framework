import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class BadRequestException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 400
        this.message = context.message || 'Bad Request'
        context ? this.error = context : null
    }
}