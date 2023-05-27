import  { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from 'uuid';

const generateTxRef = () => {
    return uuidv4();
};


export const create_payload = (req:Request) => {
    return {

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
    }
}