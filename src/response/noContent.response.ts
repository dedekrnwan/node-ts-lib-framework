import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class NoContentResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 204
        this.message = context.message || 'No Content'
        this.data = context.data || null
    }
}