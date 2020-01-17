import express from "express";

export default class Middlewares {
    constructor(){

    }
    before = (app: express.Application, middlewares: Array<any> | any): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            switch (typeof middlewares) {
                case 'function':
                    app.use(middlewares)
                    break;
            
                default:
                    middlewares.forEach(async (middleware: any) => {
                        await app.use(middleware)
                    })
                    break;
            }
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
    after = (app: express.Application, middlewares: Array<any> | any): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            switch (typeof middlewares) {
                case 'function':
                    app.use(middlewares)
                    break;
            
                default:
                    middlewares.forEach(async (middleware: any) => {
                        await app.use(middleware)
                    })
                    break;
            }
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
    error = (app: express.Application, middlewares: Array<any> | any): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
        try {
            switch (typeof middlewares) {
                case 'function':
                    app.use(middlewares)
                    break;
            
                default:
                    middlewares.forEach(async (middleware: any) => {
                        await app.use(middleware)
                    })
                    break;
            }
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}