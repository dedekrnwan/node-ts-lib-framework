import { IResponse } from "../interfaces";

export default class HttpResponse {
    public code: number
    public message: string
    public data?: any
    constructor(context: IResponse) {
        this.code = context.code || 200
        this.message = context.message || 'Ok'
        this.data = context.data || null
    }
}