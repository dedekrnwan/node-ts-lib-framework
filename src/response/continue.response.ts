import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class ContinueResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 100
        this.message = context.message || 'Continue'
        this.data = context.data || null
    }
}