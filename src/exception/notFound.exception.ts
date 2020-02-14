import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class NotFoundException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 404
        this.message = context.message || 'Not Found'
        context ? this.error = context : null
    }
}