"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = void 0;
const dotenv = __importStar(require("dotenv"));
const Flutterwave = require('flutterwave-node-v3');
const token_1 = require("../model/token");
const Recurring_1 = require("../model/Recurring");
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const verification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield token_1.CardToken.findOne({
            where: {
                otpValidation: {
                    data: {
                        tx_ref: req.body.tx_ref
                    }
                }
            }
        });
        if (transaction && transaction.otpValidation && transaction.otpValidation.data) {
            const transactionId = req.body.id;
            const response = yield flw.Transaction.verify({ id: transactionId });
            if (response.data.status === "successful" &&
                response.data.amount === transaction.otpValidation.data.amount) {
                const user = yield Recurring_1.CardDetails.create({ response });
                console.log(user);
                res.json(response);
            }
            else {
                res.json({ message: "failed transaction" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.verification = verification;
