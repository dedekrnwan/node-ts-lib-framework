import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class ResetContentResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 205
        this.message = context.message || 'Reset Content'
        this.data = context.data || null
    }
}