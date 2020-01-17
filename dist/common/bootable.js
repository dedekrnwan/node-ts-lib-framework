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
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
class Bootable {
    constructor() {
        this.use = (core, app) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (app.bootable) {
                    yield utils_1.asyncForEach(app.bootable, (folder) => __awaiter(this, void 0, void 0, function* () {
                        const dirList = fs_1.default.readdirSync(folder);
                        const promiseDirList = dirList.map((dirName) => new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                            try {
                                const fName = path_1.default.join(folder, dirName);
                                const file = (require(fName).default) ? yield require(fName).default() : fName;
                                res(file);
                            }
                            catch (error) {
                                rej(error);
                            }
                        })));
                        const result = yield Promise.all(promiseDirList);
                    }));
                    resolve(undefined);
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
exports.default = Bootable;
