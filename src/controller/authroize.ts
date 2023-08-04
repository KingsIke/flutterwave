

// import express, { Request, Response, NextFunction } from "express"
// import * as dotenv from 'dotenv'
// import Joi from "joi";
// import  { create_payload} from "../middleware/payload"
// import { CardToken } from "../model/token";
// import { UserDetails } from "../model/pin";
// import { Reference_Flw } from "../model/authorize";
// const Flutterwave = require('flutterwave-node-v3');

// dotenv.config()

// const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

// export const authorization = async (req:Request, res:Response, next:NextFunction) => {

//     try {
  
//   // const user_ref = await Reference_Flw.findOne({
//   //   where :{
//   //       checkCharge:{
//   //           data:{

//   //               tx_ref: req.body.tx_ref
//   //           }
//   //       }
        
//   //   }
//   // })

//   //   if (!user_ref) {
//   //       return res.status(404)
//   //           .json({ message: "Wrong reference details" })
//   //           // .redirect('/pay/validate')
//   //     }


//       // const flw_ref = (user_ref.checkCharge as any).data.flw_ref;
//       const flw_ref = req.body.flw_ref

//       const otpValidatePayload = {
//         otp: req.body.otp,
//         flw_ref: flw_ref,
//       };


    
//         const otpValidation = await flw.Charge.validate(otpValidatePayload);
     
//         //  await CardToken.create({otpValidation})
//         return res.status(200)
//             .json(otpValidation)
//             // .redirect('/token')

// } 
//     catch (error:any) {
//         res.status(500).json({ message: error.message });
// }

// }

