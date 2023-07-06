// import express, { Request, Response, NextFunction } from "express"
// import * as dotenv from 'dotenv'
// import  { create_payload} from "../middleware/payload"
// import { CardToken } from "../model/token";
// const Flutterwave = require('flutterwave-node-v3');

// dotenv.config()

// const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);


// // export const cardTokenized = async (req:Request, res:Response, next:NextFunction) => {
// //   const payload = create_payload(req); // Invoke the create_payload function with the req parameter

// //   const { card_number, email, ... } = payload; 
// //   // const user = CardToken.findAll({
// //   //   where: CardToken.data
// //   // })
// // // //   console.log(kings)
// // //     .then((responses) => {
// // //       // Pass the responses to the view or process them as needed
// // //       res.json( responses.data.card );
// // //     })

// // // try {
    
// // //   const details = {
// // //     token: user.card_token,
// // //     currency: "NGN",
// // //     country: "NG",
// // //     amount: 24000,
// // //     email: user.email,
// // //     tx_ref: this.generateTransactionReference(),
// // //     narration: "Payment for monthly magazine subscription",
// // // };
// // // await flw.Tokenized.charge(details);

// // // } 
// // //     catch (error:any) {
// // //         res.status(500).json({ message: error.message });
// // // }

// // }


import express, { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import { create_payload } from "../middleware/payload";
import { CardToken } from "../model/token";
import {CardDetails} from "../model/Recurring"
const Flutterwave = require('flutterwave-node-v3');
import { v4 as uuidv4 } from 'uuid';

// const generateTxRef = () => {
//     return uuidv4();
// };
dotenv.config();

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

// export const cardTokenized = async (req: Request, res: Response, next: NextFunction) => {
//   const payload = create_payload(req); 

//   const { card_number, email, ...rest } = payload; 

//   const cardFirstDigit = card_number.slice(0, 6);
//   const cardlastDigit = card_number.slice(-4);
// try{
//   const user = await CardToken.findAll({
//     where:{
//       data:{
//         card:{
//           first_6digits : cardFirstDigit,
//           last_4digits : cardlastDigit
//         }
//       }

//     }
//   })

//   const {data} = user[0]
//   const {card}:any = data;
// console.log(card);
//   res.json({ user  });

// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'An error occurred' });
// }
// };


export const cardTokenized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
 
const {  token, amount,email} = req.body
  const user = await CardDetails.findOne({
    where: {
      email: req.body.email,
      token: req.body.token
    }
  })
  const details = {
    token: user?.token,
    currency: "NGN",
    country: "NG",
    amount,
    email: user?.email,
    tx_ref:  uuidv4(),
    narration: "Payment for monthly magazine subscription",
};
const saved = await flw.Tokenized.charge(details);
console.log(saved)
res.json(saved)
} catch (error:any) {
    console.log(error.message)
}
}


