"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.readControllers = (folder) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield fs_1.default.readdirSync(folder);
        const controllers = [];
        const promControllers = list.map((item) => new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (item.toLowerCase().indexOf('.controller') >= 0) {
                    // controller
                    (require(path_1.default.join(folder, item)).default) ? controllers.push(require(path_1.default.join(folder, item)).default) : null;
                }
                else if ((item.toLowerCase().indexOf('.controller') < 0 && item.toLowerCase().indexOf('.ts') < 0) && item.toLowerCase().indexOf('.js') < 0) {
                    controllers.push(...(yield exports.readControllers(path_1.default.join(folder, item))));
                }
                res(item);
            }
            catch (error) {
                rej(error);
            }
        })));
        yield Promise.all(promControllers);
        resolve(controllers);
    }
    catch (error) {
        reject(error);
    }
}));
