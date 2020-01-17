import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class UnprocessableEntityException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 422
        this.message = context.message || 'Unprocessable Entity'
        this.error = context.error || null
    }
}