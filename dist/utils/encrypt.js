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
exports.encrypt = void 0;
const node_forge_1 = __importDefault(require("node-forge"));
const encTestKey = process.env.ENCRYPTION_KEY || "";
function encrypt(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = JSON.stringify(payload);
        const cipher = node_forge_1.default.cipher.createCipher("3DES-ECB", node_forge_1.default.util.createBuffer(encTestKey));
        cipher.start({ iv: "" });
        cipher.update(node_forge_1.default.util.createBuffer(text, "utf8"));
        cipher.finish();
        const encrypted = cipher.output;
        return node_forge_1.default.util.encode64(encrypted.getBytes());
    });
}
exports.encrypt = encrypt;
