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
const events_1 = __importDefault(require("events"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Listener {
    constructor() {
        this.use = (core, app) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (app.listener) {
                    const eventEmitter = new events_1.default.EventEmitter();
                    const dirList = yield fs_1.default.readdirSync(app.listener);
                    const promiseDirList = dirList.map((dirName) => new Promise((res, rej) => {
                        try {
                            const fName = path_1.default.join(app.listener, dirName);
                            if (dirName.replace(/.ts/g, '').replace(/.js/g, '') !== 'index') {
                                eventEmitter.on(dirName.replace(/.ts/g, '').replace(/.js/g, ''), (data) => {
                                    setImmediate(() => {
                                        const file = (require(fName).default) ? require(fName).default(data).then((result) => {
                                            return result;
                                        }).catch((err) => {
                                            throw new Error(err);
                                        }) : null;
                                    });
                                });
                            }
                            res(dirName.replace(/.ts/g, '').replace(/.js/g, ''));
                        }
                        catch (error) {
                            rej(error);
                        }
                    }));
                    const result = yield Promise.all(promiseDirList);
                    resolve(result);
                }
                else {
                    resolve(undefined);
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = Listener;
