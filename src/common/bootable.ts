import express from "express";
import { 
    IApplicationUtils, Application
} from "./../interfaces";
import fs from "fs";
import { asyncForEach } from "../utils";
import path from "path";

export default class Bootable implements IApplicationUtils {
    public core:express.Application
    constructor(){  
    }

    use = (core: express.Application, app: Application): Promise<any> => new Promise<any>(async (resolve, reject) => {
        try {
            if(app.bootable) {
                await asyncForEach(app.bootable, async(folder) => {
                    const dirList = fs.readdirSync(folder);
                    const promiseDirList = dirList.map((dirName) => new Promise<string>(async (res, rej) => {
                        try {
                            const fName = path.join(folder, dirName);
                            const file = (require(fName).default) ? await require(fName).default() : fName;
                            res(file);
                        } catch (error) {
                            rej(error);
                        }
                    }));
                    const result = await Promise.all(promiseDirList)
                    resolve(result)
                }) 
            }else{
                resolve(undefined)
            }
        } catch (error) {
            reject(error)
        }
    })
}