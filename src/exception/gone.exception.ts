import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class GoneException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 410
        this.message = context.message || 'Gone Timeout'
        this.error = context.error || null
    }
}