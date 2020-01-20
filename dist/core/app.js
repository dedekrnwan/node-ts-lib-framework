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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const kernel_1 = __importDefault(require("../common/kernel"));
const bootable_1 = __importDefault(require("../common/bootable"));
const static_1 = __importDefault(require("../common/static"));
const listener_1 = __importDefault(require("../common/listener"));
class App {
    constructor(properties) {
        this.boot = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bootable = new bootable_1.default;
                const result = yield bootable.use(this.core, this.app);
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }));
        this.listener = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listener = new listener_1.default;
                const result = yield listener.use(this.core, this.app);
                result.forEach((dir) => {
                    console.log(`listening event ${dir}`);
                });
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }));
        this.static = () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const staticHandler = new static_1.default();
                this.core = yield staticHandler.use(this.core, this.app);
                resolve(this.core);
            }
            catch (error) {
                reject(error);
            }
        }));
        this.burn = (kernel) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.core = yield kernel.use(this.core, this.app);
                resolve(this.core);
            }
            catch (error) {
                reject(error);
            }
        }));
        this.run = (port) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                /**
                 * Custom feature for dedekrnwan core app
                 */
                if (this.app.bootable.length > 0)
                    yield this.boot();
                if (this.app.static.length > 0)
                    this.core = yield this.static();
                if (this.app.listener)
                    yield this.listener();
                /**
                 * Express application as core engine of dedekrnwan core app
                 */
                this.core = yield this.burn(new kernel_1.default);
                /**
                 * Http server from node js
                 */
                this.server = yield http_1.default.createServer(this.core);
                this.server.listen(port, () => {
                    resolve({
                        core: this.core,
                        server: this.server,
                        app: this.app
                    });
                }).on('error', (error) => {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
        //#region set
        this.setModules = (props) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.app.modules = props;
            }
            catch (error) {
                reject(error);
            }
        }));
        this.setMiddlewares = (middlewares) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (middlewares) {
                    this.app.middlewares = middlewares;
                    resolve(undefined);
                }
                else {
                    reject({
                        message: `Middlewares can't be null`
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
        this.setStatic = (props) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (props) {
                    this.app.static = props;
                    resolve(undefined);
                }
                else {
                    reject({
                        message: `Static properties can't be null`
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
        this.setListener = (path) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (path.trim() !== '') {
                    this.app.listener = path;
                    resolve(undefined);
                }
                else {
                    reject({
                        message: 'Error path is string empty'
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
        this.setBootable = (paths) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.app.bootable = paths;
                resolve(undefined);
            }
            catch (error) {
                reject(error);
            }
        }));
        //#endregion
        //#region add
        this.addModules = (path, prefix) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (path) {
                    this.app.modules.push({
                        path,
                        prefix
                    });
                    resolve(undefined);
                }
                else {
                    reject({
                        message: `Modules path can't be null`
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
        this.addStatic = (props) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (props) {
                    this.app.static.push(props);
                    resolve(undefined);
                }
                else {
                    reject({
                        message: `Static properties can't be null`
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
        this.addBootable = (path) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (path.trim() !== '') {
                    this.app.bootable.push(path);
                    resolve(undefined);
                }
                else {
                    reject({
                        message: 'Error path is string empty'
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
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
        };
        this.core = express_1.default();
    }
}
exports.default = App;
