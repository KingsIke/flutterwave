import express, { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
const Flutterwave = require('flutterwave-node-v3');
import { connectDB } from './config/db'

import session, { SessionData, Store } from 'express-session';
import MemoryStore from 'memorystore';
import { Transaction } from "./model/schema";


interface MySessionData extends SessionData {
    charge_payload?: any;
    auth_fields?: any;
    auth_mode?: any;
    flow_ref?: any
}

const generateTxRef = () => {
    return uuidv4();
};

dotenv.config()
const app = express()
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const port = 4000
connectDB()


const MemoryStoreConstructor = MemoryStore(session);
const store = new MemoryStoreConstructor({
    checkPeriod: 86400000 // prune expired entries every 24h
});
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false })

    
app.post("/pay", async (req, res) => {
    const payload = {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: req.body.expiry_month,
        expiry_year: req.body.expiry_year,
        currency: req.body.currency,
        amount: req.body.amount,
        email: req.body.email,
        fullname: req.body.card_fullname,
        tx_ref: generateTxRef(),
        redirect_url: 'https://google.com',
        enckey: process.env.ENCRYPTION_KEY
    };


    try {
        const response = await flw.Charge.card(payload);
   
        const authorizationMode = response.meta.authorization.mode;

        if (authorizationMode === "pin") {
            const pin_payload = {

                ...payload,
                authorization: {
                    mode: "pin",

                    pin: 3310
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
                return res.redirect('/payment-successful');
            }
            else {
                return res.redirect('/payment-failed');
            }
        }

    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }


});

app.post("/pay/validate", async (req, res) => {


    const payload = {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: req.body.expiry_month,
        expiry_year: req.body.expiry_year,
        currency: req.body.currency,
        amount: req.body.amount,
        email: req.body.email,
        fullname: req.body.card_fullname,
        tx_ref: req.body.tx_ref,
        enckey: process.env.ENCRYPTION_KEY
    };

    const pin_payload = {
        ...payload,

        authorization: {
            mode: "pin",

            pin: 3310
        }

    }

try {
    

    const checkCharge = await flw.Charge.card(pin_payload)
    console.log(checkCharge)

    if (checkCharge.meta.authorization.mode === 'otp') {
        const flw_ref = checkCharge.data.flw_ref
        const otpValidatePayload = {
            otp: req.body.otp,
            flw_ref: flw_ref
        };
    
        const otpValidation = await flw.Charge.validate(otpValidatePayload);
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
            return res.send('Payment successful');
        }

        else {
            return res.send('Payment-failed');
        }
    }

} 
    catch (error:any) {
        res.status(500).json({ message: error.message });
}

});
    

app.listen(port, () => {
    console.log(`server at port ${port}`)

});