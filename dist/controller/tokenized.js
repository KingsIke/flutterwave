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
exports.cardTokenized = void 0;
const dotenv = __importStar(require("dotenv"));
const Flutterwave = require('flutterwave-node-v3');
const uuid_1 = require("uuid");
const generateTxRef = () => {
    return (0, uuid_1.v4)();
};
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const cardTokenized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await CardDetails.findOne({
        // where: {
        // response:{
        // data:{
        // card:{
        // token: req.body.token,
        // },
        // customer:{
        // email:req.body.email
        // }
        // }
        // }
        // }
        // })
        // const details = {
        // token: (user?.response as any).data.card.token,
        // currency: req.body.currency,
        // country:req.body.country,
        // amount: req.body.amount,
        // email: (user?.response as any).data.customer.email,
        // tx_ref: generateTxRef(),
        // narration: "Payment for monthly magazine subscription",
        // };
        const details = {
            token: req.body.token,
            currency: req.body.currency,
            country: req.body.country,
            amount: req.body.amount,
            email: req.body.email,
            tx_ref: generateTxRef(),
            narration: "Payment for monthly magazine subscription",
        };
        // if (!user) {
        // return res.status(404).json({ message: "Card details is Wrong" });
        // }
        const charged = yield flw.Tokenized.charge(details);
        console.log(charged);
        res.json(charged);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.cardTokenized = cardTokenized;
