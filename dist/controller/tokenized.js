"use strict";
// import express, { Request, Response, NextFunction } from "express";
// import * as dotenv from 'dotenv';
// import {CardDetails} from "../model/Recurring"
// const Flutterwave = require('flutterwave-node-v3');
// import { v4 as uuidv4 } from "uuid";
// const generateTxRef = () => {
// return uuidv4();
// };
// dotenv.config();
// const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
// export const cardTokenized = async (req: Request, res: Response, next: NextFunction) => {
// try {
// // const user = await CardDetails.findOne({
// // where: {
// // response:{
// // data:{
// // card:{
// // token: req.body.token,
// // },
// // customer:{
// // email:req.body.email
// // }
// // }
// // }
// // }
// // })
// // const details = {
// // token: (user?.response as any).data.card.token,
// // currency: req.body.currency,
// // country:req.body.country,
// // amount: req.body.amount,
// // email: (user?.response as any).data.customer.email,
// // tx_ref: generateTxRef(),
// // narration: "Payment for monthly magazine subscription",
// // };
// const details = {
//     token: req.body.token,
//     currency: req.body.currency,
//     country:req.body.country,
//     amount: req.body.amount,
//     email: req.body.email,
//     tx_ref: generateTxRef(),
//     narration: "Payment for monthly magazine subscription",
//     };
// // if (!user) {
// // return res.status(404).json({ message: "Card details is Wrong" });
// // }
// const charged = await flw.Tokenized.charge(details);
// console.log(charged)
// res.json(charged)
// } catch (error:any) {
// console.log(error.message)
// res.status(500).json({ message: "An error occurred" });
// }
// }
