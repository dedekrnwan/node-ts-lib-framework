import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class InternalServerException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 500
        this.message = context.message || 'Internal Server'
        this.error = context.error || null
    }
}