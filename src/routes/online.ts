
import express, { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv'
import { Transaction } from "../model/schema";
import  { create_payload} from "../middleware/payload"
const Flutterwave = require('flutterwave-node-v3');


dotenv.config()

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

app.post('/endp', (req:Request, res: Response) => {

    const endpoint = 'https://api.flutterwave.com/v3/charges?type=card'
    const method = 'POST'
    const card_number= req.body.card_number;
    const  cvv = req.body.cvv
      const expiry_month = req.body.expiry_month
      const expiry_year = req.body.expiry_year
      const currency = req.body.currency
      const amount = req.body.amount
      const email = req.body.email
      const fullname = req.body.card_fullname
      // const tx_ref = generateTxRef()
      // redirect_url: 'https://google.com',
      // enckey: process.env.ENCRYPTION_KEY
      const 
  try {
  } catch (error) {
    
  }
})