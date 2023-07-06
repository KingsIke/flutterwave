''

import express from 'express';
// import { pay_authroize } from '../controller/pay';
import { verification } from '../controller/verify';


const router = express.Router()
 

router.post('/verify-payment', verification)
export default router