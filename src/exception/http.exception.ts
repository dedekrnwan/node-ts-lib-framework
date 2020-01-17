import { IResponse } from "../interfaces";

export default class HttpException {
    public code: number
    public message: string
    public error?: any
    constructor(context: Error | any) {
        this.code = context.code || 500
        this.message = context.message || 'Internal Server Error'
        this.error = context.error || null
    }
}