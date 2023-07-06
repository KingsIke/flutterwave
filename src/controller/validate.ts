import express, { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv'
import  { create_payload} from "../middleware/payload"
import { CardToken } from "../model/token";
const Flutterwave = require('flutterwave-node-v3');

dotenv.config()

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);


export const validate_pay = async (req:Request, res:Response, next:NextFunction) => {

    const payload = create_payload(req)

    const pin_payload = {
        ...payload,

        authorization: {
            mode: "pin",

            pin: req.body.pin
        }

    }

try {
    

    const checkCharge = await flw.Charge.card(pin_payload)
    // console.log(checkCharge)

    if (checkCharge.meta.authorization.mode === 'otp') {
        const flw_ref = checkCharge.data.flw_ref
        const otpValidatePayload = {
            otp: req.body.otp,
            flw_ref: flw_ref
        };
    
        const otpValidation = await flw.Charge.validate(otpValidatePayload);
        console.log(otpValidation)
        const details = await CardToken.create(otpValidation)
        return res.status(200).json(otpValidation)

    } else if (checkCharge.meta.authorization.mode === 'redirect') {
        const authUrl = checkCharge.meta.authorization.redirect;
        return res.redirect(authUrl);
    } else {
        const transactionId = checkCharge.data.id;
        const transaction = await flw.Transaction.verify({
            id: transactionId
        });
        if (transaction.data.status == "success") {
            return res.json({ message:'Payment successful'});
        }

        else {
            return res.json({ message: 'Payment-failed'});
        }
    }

} 
    catch (error:any) {
        res.status(500).json({ message: error.message });
}

}

