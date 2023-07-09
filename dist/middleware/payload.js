"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_payload = void 0;
const uuid_1 = require("uuid");
const generateTxRef = () => {
    return (0, uuid_1.v4)();
};
const create_payload = (req) => {
    return {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: req.body.expiry_month,
        expiry_year: req.body.expiry_year,
        currency: req.body.currency,
        amount: req.body.amount,
        email: req.body.email,
        fullname: req.body.card_fullname,
        tx_ref: generateTxRef(),
        redirect_url: 'https://google.com',
        enckey: process.env.ENCRYPTION_KEY
    };
};
exports.create_payload = create_payload;
