import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class PartialContentResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 206
        this.message = context.message || 'Partial Content'
        this.data = context.data || null
    }
}