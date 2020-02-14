import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class ConflictException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 409
        this.message = context.message || 'Conflict'
        context ? this.error = context : null
    }
}