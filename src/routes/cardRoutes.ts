import express from 'express';
import { cardInitiate, pinchargeCard, authorizationCard, verification, cardTokenized, cardInitiateUrl, pinAuthorisenUrl, authorizationCardUrl } from '../controller/card';
const router = express.Router();

router.post( '/pay', cardInitiate)
router.post( '/pay-pin', pinchargeCard)
router.post( '/authroize', authorizationCard)
router.post('/verify-payment', verification)
router.post( '/token', cardTokenized)

router.post('/url_pay', cardInitiateUrl)

router.post('/url_pinAuth', pinAuthorisenUrl)
router.post('/url_authroize', authorizationCardUrl)




export default router;