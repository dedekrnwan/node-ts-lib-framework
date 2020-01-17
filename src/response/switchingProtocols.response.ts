import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class SwitchingProtocolsResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 101
        this.message = context.message || 'Switching Protocols'
        this.data = context.data || null
    }
}