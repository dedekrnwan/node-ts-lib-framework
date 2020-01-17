import { IResponse } from "../interfaces";
import HttpResponse from "./http.response";

export default class NonAuthoritativeInformationResponse extends HttpResponse {
    constructor(context: IResponse) {
        super(context)
        this.code = context.code || 203
        this.message = context.message || 'Non Authoritative Information'
        this.data = context.data || null
    }
}