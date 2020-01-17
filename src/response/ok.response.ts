import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class OkResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 200
        this.message = context.message || 'Ok'
        this.data = context.data || null
    }
}