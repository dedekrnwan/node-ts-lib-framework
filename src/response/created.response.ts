import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class CreatedResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 201
        this.message = context.message || 'created'
        this.data = context.data || null
    }
}