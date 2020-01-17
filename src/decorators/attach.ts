import * as express from "express";
import { IMiddlewaresObject,IRoutes } from "../interfaces";
import { asyncForEach, readControllers } from "./../utils";

export const AttachController = (app:express.Application, folderController:string, uses:string):Promise<any> => new Promise(async (resolve, reject) => {
    try {
        const controllers = await readControllers(folderController) 
        await asyncForEach(controllers, async (controller:any) => {
            let metakey:any = {
                routes: `${controller.name}:routes`,
                prefix: `${controller.name}:prefix`,
                middlewares: `${controller.name}:middlewares`,
            }
            const instance = await new controller();
            const prefix = await Reflect.getMetadata(metakey.prefix, controller);
            const routes:Array<IRoutes> = await Reflect.getMetadata(metakey.routes, controller);

            const controllerMiddlewares:IMiddlewaresObject = await Reflect.getMetadata(metakey.middlewares, controller) || <IMiddlewaresObject> {
                before: [],
                after: [],
                error: []
            };
            const router:any = await  express.Router(); 
            routes.forEach(async (route:any) => {
                let middlewares:IMiddlewaresObject = await  Reflect.getMetadata(metakey.middlewares, controller, route.function) || <IMiddlewaresObject> {
                    before: [],
                    after: [],
                    error: []
                };
                let handler:express.RequestHandler= await <express.RequestHandler> instance[route.function];
                await router.route(`${route.path}`)[route.method]([...controllerMiddlewares.before,...middlewares.before, handler, ...middlewares.after,...controllerMiddlewares.after]) 
                await app.use(`${uses||''}${prefix}`, router);
            });
        })
        resolve(app);
    } catch (error) {
        reject(error);
    }
})
