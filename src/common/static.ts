import express from "express";
import { 
    IApplicationUtils, Application, IApplicationStaticProperties
} from "./../interfaces";
import { asyncForEach } from "../utils";

export default class Static implements IApplicationUtils {
    public core:express.Application
    constructor(){  
    }

    use = (core: express.Application, app: Application): Promise<any> => new Promise<any>(async (resolve, reject) => {
        try {
            if(app.static) {
                await asyncForEach(app.static, async(props:IApplicationStaticProperties) => {
                    core = await core.use(props.prefix, express.static(props.path))
                }) 
            }
            resolve(core)
        } catch (error) {
            reject(error)
        }
    })
}