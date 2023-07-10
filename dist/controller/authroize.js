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
exports.authorization = void 0;
const dotenv = __importStar(require("dotenv"));
const Flutterwave = require('flutterwave-node-v3');
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user_ref = await Reference_Flw.findOne({
        //   where :{
        //       checkCharge:{
        //           data:{
        //               tx_ref: req.body.tx_ref
        //           }
        //       }
        //   }
        // })
        //   if (!user_ref) {
        //       return res.status(404)
        //           .json({ message: "Wrong reference details" })
        //           // .redirect('/pay/validate')
        //     }
        // const flw_ref = (user_ref.checkCharge as any).data.flw_ref;
        const flw_ref = req.body.flw_ref;
        const otpValidatePayload = {
            otp: req.body.otp,
            flw_ref: flw_ref,
        };
        const otpValidation = yield flw.Charge.validate(otpValidatePayload);
        //  await CardToken.create({otpValidation})
        return res.status(200)
            .json(otpValidation);
        // .redirect('/token')
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.authorization = authorization;
