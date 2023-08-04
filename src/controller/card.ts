import express, { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv'
import  { create_payload} from "../middleware/payload"
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from "../utils/encrypt";
import axios from "axios";
const Flutterwave = require('flutterwave-node-v3');

const SKEY =  process.env.SECRET_KEY

const generateTxRef = () => {
    return uuidv4();
};


dotenv.config()

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

export const cardInitiate = async (req:Request, res:Response) => {

    const payload = create_payload(req)

      

    try {  
        const response = await flw.Charge.card(payload);   
        const authorizationMode = response.meta.authorization.mode;

        if (authorizationMode === "pin") {

            res.status(200)
                .json({message:"Input Pin"})
                // .redirect('/pay/validate')

        } else if (authorizationMode === 'redirect') {
                const txRef = response.data.tx_ref
                const transactionId = response.data.id;
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

export const pinchargeCard = async (req:Request, res:Response, next:NextFunction) => {
        const payload = create_payload(req)
        const pin_payload = {
          ...payload,
          authorization: {
            mode: "pin",
            pin: req.body.pin,
          },
        };
  
  try {
  
      const checkCharge = await flw.Charge.card(pin_payload)
  
      if (checkCharge.meta.authorization.mode === 'otp') {
        res.status(200).json(checkCharge.data)
        
      } else if (checkCharge.meta.authorization.mode === 'redirect') {
          const authUrl = checkCharge.meta.authorization.redirect;
          return res.redirect(authUrl);
      } else {
          const transactionId = checkCharge.data.id;
          const transaction = await flw.Transaction.verify({
              id: transactionId
          });
          if (transaction.data.status == "success") {
              return res.json({ message:'Payment successful'});
          }
  
          else {
              return res.json({ message: 'Payment-failed'});
          }
      }
  
  } 
      catch (error:any) {
          res.status(500).json({ message: error.message });
  }
  
}

  
export const authorizationCard = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const flw_ref = req.body.flw_ref
      const otpValidatePayload = {
        otp: req.body.otp,
        flw_ref: flw_ref,
      };

        const otpValidation = await flw.Charge.validate(otpValidatePayload);
        return res.status(200)
            .json(otpValidation)
            // .redirect('/token')

} 
    catch (error:any) {
        res.status(500).json({ message: error.message });
}

}
  
export const verification = async (req: Request, res: Response) => {
    try {
        const transactionId = req.body.id;
        const response = await flw.Transaction.verify({ id: transactionId });
  
        if (response.data.status === "successful") {
          res.json(response)
          
        } else {
          res.json({ message: "failed transaction" });
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
};

export const cardTokenized = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const details = {
        token: req.body.token,
        currency: req.body.currency,
        country:req.body.country,
        amount: req.body.amount,
        email: req.body.email,
        tx_ref: generateTxRef(),
        narration: "Payment for monthly magazine subscription",
        };
    
    const charged = await flw.Tokenized.charge(details);
    console.log(charged)
    res.json(charged)
    
    } catch (error:any) {
    console.log(error.message)
    res.status(500).json({ message: "An error occurred" });
    }
}


export const cardInitiateUrl =async( req:Request, res:Response) => {
    try {
        const payload = create_payload(req)
        const encryptPayload = await encrypt(payload)
        const requestData = (await axios.post('https://api.flutterwave.com/v3/charges?type=card',
        {
            'client': encryptPayload
        },
        {
           headers:{ "Authorization": `Bearer ${SKEY}`,
            "Content-Type": 'application/json'}
        }
        
        )).data
        console.log(requestData)
        return res.status(200).json({message: "successful", data: requestData})
        
    } catch (error:any) {
        console.log(error.response.data);
        return res.json({message:error.message});
    }

}
export const pinAuthorisenUrl = async(req:Request, res: Response) => {

    try {
        
   
    const payload = create_payload(req)

    const pin_payload = {
        ...payload,
        authorization: {
          mode: "pin",
          pin: req.body.pin,
        },
      };


      const encryptPayload = await encrypt(pin_payload)
      const requestData = (await axios.post('https://api.flutterwave.com/v3/charges?type=card',
      {
          'client': encryptPayload
      },
      {
         headers:{ "Authorization": `Bearer ${SKEY}`,
          "Content-Type": 'application/json'}
      }
      )).data
      console.log(requestData)
      return res.status(200).json({message: "successful", data: requestData})
      

    } catch (error:any) {
        console.log(error.response.data);
        return res.json({message:error.message});
    }
}

export const authorizationCardUrl = async (req:Request, res:Response, next:NextFunction) => {
    try {
    //   const flw_ref = req.body.flw_ref
      const otpValidatePayload = {
        otp: req.body.otp,
        flw_ref: req.body.flw_ref,
      };

  const encryptPayload = await encrypt(otpValidatePayload);

  const requestData = await (await axios.post('https://api.flutterwave.com/v3/validate-charge',
   encryptPayload,
  {
     headers:{ "Authorization": `Bearer ${SKEY}`,
      "Content-Type": 'application/json'}
  }
  )).data
  console.log(requestData)
  return res.status(200).json({message: "successful", data: requestData})

} 
    catch (error:any) {
        console.log(error)
        if (error?.response?.data) {
            return res.status(error.response.status || 500).json({
                message: error.response.data.message || 'An error occurred. Please try again later.'
            });
        } else {
            return res.status(500).json({ message: 'An error occurred. Please try again later.' });
        }
}
// THEY ARE DOING UPDATES ON THIS ROUTE 
}