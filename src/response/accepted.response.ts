import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class AcceptedResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 202
        this.message = context.message || 'Accepted'
        this.data = context.data || null
    }
}