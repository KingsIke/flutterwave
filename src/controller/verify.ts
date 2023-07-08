import express, { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv'
import { Transaction } from "../model/schema";
import { CardDetails } from "../model/Recurring";
const Flutterwave = require('flutterwave-node-v3');
import { v4 as uuidv4 } from "uuid";
import { CardToken } from "../model/token";



dotenv.config()

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);



export const verification =   async (req: Request, res: Response) => {
// //   try {
// //     // Retrieve the transaction ID from the query parameter or any other source
// //     const transactionId = req.query.id;


// //     const transaction = await flw.Transaction.verify({ id: transactionId });

// //     if (transaction.data.status === 'successful') {
// //       return res.json({
// //         transaction
// //         // message: 'Payment successful'
// //       });
// //     } else {
// //       return res.json({
// //         message: 'Payment failed'
// //       });
// //     }
// //   } catch (error:any) {
// //     res.status(500).json({  error, message: 'hello' });
// //   }
const transaction = await CardToken.findOne({
              where:{
                otpValidation:{
  
                  data:{
                      tx_ref:req.body.tx_ref
                  }
                }
              }
          })
const transactionId  = req.body.id
flw.Transaction.verify({ id: transactionId })
    .then((response:any) => {
        if (
            response.data.status === "successful") {
            // Success! Confirm the customer's payment
            res.json(response)
        } else {
            res.json({message: "failed transation"})
            // Inform the customer their payment was unsuccessful
        }
    })
    .catch(console.log
        );
};



// export const verification = async (req: Request, res: Response) => {
//     try {
//         const transaction = await CardToken.findOne({
//             where:{
//               otpValidation:{

//                 data:{
//                     tx_ref:req.body.tx_ref
//                 }
//               }
//             }
//         })
//         console.log(transaction)
//         res.json(transaction)
//       const transactionId = req.body.id;
//       const response = await flw.Transaction.verify({ id: transactionId });
  
//       if (response.data.status === "successful") {
//     //     const {email} = response.data.customer;
//     //     const {token, first_6digits, last_4digits} = response.data.card

//     //     const card_Details = response.data.card
//     //     console.log(response.data.customer)
//     //     console.log(card_Details)
//     //     await CardDetails.create({
//     //         id: uuidv4(),
//     //         email,
//     //         token,
//     //         first_6digits,
//     //         last_4digits
//     //     })
//         res.json(response);
//       } else {
//         res.json({ message: "failed transaction" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "An error occurred" });
//     }
//   };
  