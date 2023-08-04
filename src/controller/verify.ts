// import express, { Request, Response, NextFunction } from "express";
// import * as dotenv from 'dotenv';
// const Flutterwave = require('flutterwave-node-v3');
// import { CardToken } from "../model/token";
// import { CardDetails } from "../model/Recurring";

// dotenv.config();

// const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

// export const verification = async (req: Request, res: Response) => {
//   try {
//     // const transaction = await CardToken.findOne({
//     //   where: {
//     //     otpValidation: {
//     //       data: {
//     //         tx_ref: req.body.tx_ref
//     //       }
//     //     }
//     //   }
//     // });

//     // if (transaction && transaction.otpValidation && (transaction.otpValidation as any).data) {
//       const transactionId = req.body.id;
//       const response = await flw.Transaction.verify({ id: transactionId });

//       if (
//         response.data.status === "successful" 
//         // &&
//         // response.data.amount === (transaction.otpValidation as any).data.amount
//       ) {

//         // const user = await CardDetails.create({response})
//         // console.log(user)
//         res.json(response)
        
//       } else {
//         res.json({ message: "failed transaction" });
//       }
//     // }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// };
