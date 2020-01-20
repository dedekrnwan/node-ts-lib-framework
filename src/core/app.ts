import {
    IApplicationCore, Application, IApplicationProperties, IApplicationResult, IApplicationMiddlewares, IApplicationStaticProperties
} from "../interfaces";
import http from "http";
import express from "express";
import Kernel from "../common/kernel";
import Bootable from "../common/bootable";
import Static from "../common/static";
import Listener from "../common/listener";

export default class App implements IApplicationCore {
    public app: IApplicationProperties
    public core:express.Application
    public server?:http.Server
    constructor(properties?: IApplicationProperties){
        this.app = properties || {
            bootable: [],
            static: [],
            middlewares: {
                before: [],
                after: [],
                error: []
            },
            modules: [],
            context: {},
            listener: null
        }
        this.core = express()
    }
    boot = (): Promise<any> => new Promise<any>(async(resolve, reject) => {
        try {
            const bootable = new Bootable
            const result = await bootable.use(this.core,this.app)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
    listener = (): Promise<any> => new Promise<any>(async(resolve, reject) => {
        try {
            const listener = new Listener
            const result = await listener.use(this.core,this.app)
            result.forEach((dir: string) => {
                this.app.logger ? this.app.logger.info(`listening event ${dir}`) : console.log(`listening event ${dir}`);
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
    static = (): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            const staticHandler = new Static()
            this.core = await staticHandler.use(this.core,this.app)
            resolve(this.core)
        } catch (error) {
    		reject(error)
        }
    })
    burn = (kernel: Kernel): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            this.core = await kernel.use(this.core, this.app)
            resolve(this.core)
        } catch (error) {
            reject(error)
        }
    })
    run = (port: number):Promise<IApplicationResult> => new Promise<IApplicationResult>(async (resolve, reject) => {
        try {
            /**
             * Custom feature for dedekrnwan core app
             */
            if(this.app.bootable.length > 0 ) await this.boot()
            if(this.app.static.length > 0) this.core = await this.static()
            if(this.app.listener) await this.listener()
           
            /**
             * Express application as core engine of dedekrnwan core app
             */
            this.core = await this.burn(new Kernel)
            /**
             * Http server from node js
             */
            this.server = await http.createServer(this.core)

            this.server.listen(port, () => {
                resolve({
                    core: this.core,
                    server: this.server,
                    app: this.app
                })
    		}).on('error', (error) => {
    			reject(error);
    		});
        } catch (error) {
            reject(error)
        }
    })

    //#region set
    setModules = (props: Array<{path: string, prefix?: string}>): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            this.app.modules = props
        } catch (error) {
            reject(error)
        }
    })
    setMiddlewares = (middlewares: IApplicationMiddlewares): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(middlewares){
                this.app.middlewares = middlewares
                resolve(undefined)
            }else{
                reject({
                    message: `Middlewares can't be null`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
    setStatic = (props: Array<IApplicationStaticProperties>): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(props){
                this.app.static = props
                resolve(undefined)
            }else{
                reject({
                    message: `Static properties can't be null`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
    setListener = (path: string): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(path.trim() !== ''){
                this.app.listener = path
                resolve(undefined)
            }else{
                reject({
                    message: 'Error path is string empty'
                })
            }
        } catch (error) {
            reject(error)
        }
    })   
    setBootable = (paths: Array<string>): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            this.app.bootable = paths
            resolve(undefined)
        } catch (error) {
            reject(error)
        }
    })   
    //#endregion
    //#region add
    addModules = (path: string, prefix?: string): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(path){
                this.app.modules.push({
                    path,
                    prefix
                })
                resolve(undefined)
            }else{
                reject({
                    message: `Modules path can't be null`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
    addStatic = (props: IApplicationStaticProperties): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(props){
                this.app.static.push(props)
                resolve(undefined)
            }else{
                reject({
                    message: `Static properties can't be null`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
    addBootable = (path: string): Promise<void> => new Promise<void>(async (resolve, reject) => {
        try {
            if(path.trim() !== ''){
                this.app.bootable.push(path)
                resolve(undefined)
            }else{
                reject({
                    message: 'Error path is string empty'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
    //#endregion
}