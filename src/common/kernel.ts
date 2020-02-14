import express from "express";
import { 
    IApplicationUtils, Application, IResponse
} from "./../interfaces";
import Middlewares from "./middlewares";
import { AttachController } from "./../decorators";
import { asyncForEach } from "../utils";

export default class Kernel implements IApplicationUtils{
    public core:express.Application
    public Middlewares: Middlewares
    constructor(){  
        this.Middlewares = new Middlewares
    }
    response = (structured: IResponse, request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.status((structured.code) ? Number.isInteger(structured.code) ? structured.code < 600 ? structured.code : 500 : 500 : 500).json(structured);
    }
    notFound = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.status(404).json({
            code: 404,
            message: 'Not found',
        });
    }
    use = (core: express.Application, app: Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            core.disabled('x-powered-by')
            core.disabled('etag')
            //loop middlewares
            this.core = await this.Middlewares.before(core,app.middlewares.before || [])
            await asyncForEach(app.modules, async (handler) => {
                this.core = await AttachController(this.core, handler.path, handler.prefix)
            })
            this.core = await this.Middlewares.after(this.core,app.middlewares.after || [])
            this.core.use(this.response)
            this.core.use(this.notFound)
            this.core = await this.Middlewares.error(this.core,app.middlewares.error || [])
            resolve(this.core)
        } catch (error) {
            reject(error)
        }
    })
}