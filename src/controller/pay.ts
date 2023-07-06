// import express, { Request, Response, NextFunction } from "express"
// import * as dotenv from 'dotenv'
// import { Transaction } from "../model/schema";
// import  { create_payload} from "../middleware/payload"
// const Flutterwave = require('flutterwave-node-v3');


// dotenv.config()

// const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

// export const pay_authroize = async (req:Request, res:Response) => {

//     const payload = create_payload(req)

//     try {
//         const response = await flw.Charge.card(payload);
   
//         const authorizationMode = response.meta.authorization.mode;

//         if (authorizationMode === "pin") {
//             const pin_payload = {

//                 ...payload,
//                 authorization: {
//                     mode: "pin",

//                     pin: 3310
//                 }
//             };
//             let checkCharge = await flw.Charge.card(pin_payload)
//             return res.status(200).json(checkCharge.data.tx_ref)

//         } else if (authorizationMode === 'redirect') {
//             await Transaction.create({
//                 txRef: response.data.tx_ref,
//                 transactionId: response.data.id,
//             });
//             const authUrl = response.meta.authorization.redirect;
//             return res.redirect(authUrl);

//         } else {
//             const transactionId = response.data.id;
//             const transaction = await flw.Transaction.verify({ id: transactionId });

//             if (transaction.data.status === 'successful') {
//                 return res.json({
//                     message: 'payment successful'
//                 });
//             }
//             else {
//                 return res.json({
//                     message: 'payment-failed'
//                 });
//             }
//         }

//     } catch (error:any) {
//         res.status(500).json({ message: error.message });
//     }

// }


import express, { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv'
import { Transaction } from "../model/schema";
import  { create_payload} from "../middleware/payload"
const Flutterwave = require('flutterwave-node-v3');


dotenv.config()

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

export const pay_authroize = async (req:Request, res:Response) => {

    const payload = create_payload(req)

    try {
        
        const response = await flw.Charge.card(payload);
   
        const authorizationMode = response.meta.authorization.mode;

        if (authorizationMode === "pin") {
            const pin_payload = {

                ...payload,
                authorization: {
                    mode: "pin",

                    pin: req.body.pin
                }
            };
            let checkCharge = await flw.Charge.card(pin_payload)
            return res.status(200).json(checkCharge.data.tx_ref)

        } else if (authorizationMode === 'redirect') {
            await Transaction.create({
                txRef: response.data.tx_ref,
                transactionId: response.data.id,
            });
            const authUrl = response.meta.authorization.redirect;
            return res.redirect(authUrl);

        } else {
            const transactionId = response.data.id;
            const transaction = await flw.Transaction.verify({ id: transactionId });

            if (transaction.data.status === 'successful') {
                return res.json({
                    message: 'payment successful'
                });
            }
            else {
                return res.json({
                    message: 'payment-failed'
                });
            }
        }

    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}