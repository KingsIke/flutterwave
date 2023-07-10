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
exports.validate_pay = void 0;
const dotenv = __importStar(require("dotenv"));
const payload_1 = require("../middleware/payload");
const Flutterwave = require('flutterwave-node-v3');
dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const validate_pay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const userdetail = await UserDetails.findOne({
    //   where :{
    //       payload:{
    //           card_number:req.body.card_number,
    //           cvv:req.body.cvv
    //       }
    //   }
    // })
    //   if (!userdetail) {
    //       return res.status(404)
    //           .json({ message: "Wrong Card details" })
    //           // .redirect('/pay',)
    //     }
    // const payload = userdetail.payload;
    const payload = (0, payload_1.create_payload)(req);
    const pin_payload = Object.assign(Object.assign({}, payload), { authorization: {
            mode: "pin",
            pin: req.body.pin,
        } });
    try {
        const checkCharge = yield flw.Charge.card(pin_payload);
        if (checkCharge.meta.authorization.mode === 'otp') {
            // const [referenceFlw, created] = await Reference_Flw.findOrCreate({
            //     where: { checkCharge },
            //     defaults: { checkCharge },
            //   });
            //   if (!created) {
            //     throw new Error("Reference already exists");
            //   }
            res.status(200).json(checkCharge.data);
        }
        else if (checkCharge.meta.authorization.mode === 'redirect') {
            const authUrl = checkCharge.meta.authorization.redirect;
            return res.redirect(authUrl);
        }
        else {
            const transactionId = checkCharge.data.id;
            const transaction = yield flw.Transaction.verify({
                id: transactionId
            });
            if (transaction.data.status == "success") {
                return res.json({ message: 'Payment successful' });
            }
            else {
                return res.json({ message: 'Payment-failed' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.validate_pay = validate_pay;
