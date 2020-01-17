import { IResponse } from "../interfaces";
import HttpException from "./http.exception";

export default class UnSupportedMediaTypeException extends HttpException {
    constructor(context: Error | any) {
        super(context)
        this.code = context.code || 415
        this.message = context.message || 'UnSupported Media Type'
        this.error = context.error || null
    }
}