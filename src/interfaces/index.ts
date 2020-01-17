import Bootable from "./../common/bootable";
import Kernel from "./../common/kernel";
import express from "express";
import http from "http";

export interface IMiddlewares {
    before?(express: express.Application, middlewares: express.RequestHandler | Array<express.RequestHandler>) : express.Application
    after?(express: express.Application, middlewares: express.RequestHandler | Array<express.RequestHandler>) : express.Application
    error?(express: express.Application, middlewares: express.RequestHandler | Array<express.RequestHandler>) : express.Application
}

export interface IApplicationMiddlewares {
    before?: Function | Array<Function>
    after?: Function | Array<Function>
    error?: Function | Array<Function>
}

export interface IApplicationResult {
    core: express.Application,
    server: http.Server,
    app: Application
    context?: any
}

export interface Application {
    middlewares?:IApplicationMiddlewares
    modules?: Array<ModulesOptions>
    bootable?: Array<string>
    static?: Array<IApplicationStaticProperties>
    listener?: string
}

export interface IApplicationStaticProperties {
    prefix: string
    path: string
}

export interface ModulesOptions {
    path:string
    prefix?:string
}

export interface IApplicationCore {
    core: express.Application
    server?:http.Server
    app?: Application
    boot?(bootable?: Bootable):Promise<Array<string>> ;
    burn(kernel: Kernel): Promise<express.Application>;
    static?(folder?: string): Promise<express.Application>;
    run(port: number): Promise<IApplicationResult>;
}

export interface IApplicationProperties extends Application {
    context
}

export interface IApplicationUtils {
    core?:express.Application
    app?: Application
    use(core: express.Application, app:Application): Promise<express.Application | void | any>
}

export interface IResponse {
    code?: number
    message: string
    data?: any
    error?: any
}

export interface IHttpException {
    catch(): IResponse
}

export interface IRoutes {
    path: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'checkout' | 'copy' | 'delete' | 'get' | 'head'
    | 'lock' | 'merge' | 'mkactivity' | 'mkcol' | 'move' | 'm-search' | 'notify' | 'options' | 'purge' | 'report' | 'search'
    | 'subscribe' | 'trace' | 'unlock' | 'unsubscribe',
}

export interface IMiddlewaresObject {
    before:Array<any>,
    after:Array<any>,
    error:Array<any>,
}
