import express from "express";
import { 
    IApplicationUtils, Application
} from "./../interfaces";
import Events from 'events';
import path from 'path';
import fs from "fs";

export default class Listener implements IApplicationUtils {
    public core:express.Application
    constructor(){  
    }

    use = (core: express.Application, app: Application): Promise<any> => new Promise<any>(async (resolve, reject) => {
        try {
            if(app.listener) {
                const eventEmitter = new Events.EventEmitter();
                const dirList = await fs.readdirSync(app.listener);
                const promiseDirList = dirList.map((dirName) => new Promise((res, rej) => {
                    try {
                        const fName = path.join(app.listener, dirName);
                        if (dirName.replace(/.ts/g, '').replace(/.js/g, '') !== 'index') {
                            eventEmitter.on(dirName.replace(/.ts/g, '').replace(/.js/g, ''), (data) => {
                                setImmediate(() => {
                                    const file = (require(fName).default) ? require(fName).default(data).then((result) => {
                                        return result
                                    }).catch((err) => {
                                        throw new Error(err);
                                    }) : null;
                                });
                            });
                        }
                        res(dirName.replace(/.ts/g, '').replace(/.js/g, ''));
                    } catch (error) {
                        rej(error);
                    }
                }));
                const result = await Promise.all(promiseDirList);
                resolve(result)
            }else{
                resolve(undefined)
            }
        } catch (error) {
            reject(error)
        }
    })
}