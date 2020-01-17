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
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
class Static {
    constructor() {
        this.use = (core, app) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (app.static) {
                    yield utils_1.asyncForEach(app.static, (props) => __awaiter(this, void 0, void 0, function* () {
                        core = yield core.use(props.prefix, express_1.default.static(props.path));
                    }));
                }
                resolve(core);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = Static;
