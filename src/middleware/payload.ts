import  { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from 'uuid';
import * as Joi from 'joi';


const generateTxRef = () => {
    return uuidv4();
};
const payloadSchema = Joi.object({
    card_number: Joi.string().required(),
    cvv: Joi.string().required(),
    expiry_month: Joi.string().required(),
    expiry_year: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
    email: Joi.string().required().email(),
    fullname: Joi.string().required(),
    pin: Joi.string()
  });

export const create_payload = (req:Request) => {
    const { error, value } = payloadSchema.validate(req.body);
  
    if (error) {
      throw new Error(error.details[0].message);
    }
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
        redirect_url: 'https://getflick.app/',
        enckey: process.env.ENCRYPTION_KEY
    }
}