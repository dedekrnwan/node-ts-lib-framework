import path from "path";
import fs from "fs";

export const asyncForEach = async (array:Array<any>, callback:any) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const readControllers = (folder: string) => new Promise<Array<any>>(async (resolve, reject) => {
	try {
		const list = await fs.readdirSync(folder);
		const controllers = [];
		const promControllers = list.map((item) => new Promise(async (res, rej) => {
			try {
				if (item.toLowerCase().indexOf('.controller') >= 0) {
					// controller
					(require(path.join(folder,item)).default) ? controllers.push(require(path.join(folder,item)).default) : null;
				} else if ((item.toLowerCase().indexOf('.controller') < 0 && item.toLowerCase().indexOf('.ts') < 0) && item.toLowerCase().indexOf('.js') < 0) {
					controllers.push(...(await readControllers(path.join(folder, item))));
				}
				res(item);
			} catch (error) {
				rej(error);
			}
		}));
		await Promise.all(promControllers);
		resolve(controllers);
	} catch (error) {
		reject(error);
	}
});