import express from 'express';
import { validate_pay } from '../controller/validate';


const router = express.Router()
 

router.post( '/pay/validate', validate_pay)
export default router