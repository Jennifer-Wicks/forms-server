require("dotenv").config();

const express = require('express');

const router = express.Router();

const sendEmailCustomerRoute = require('./emailDestinations/sendEmailCustomer');
const sendEmailCustomerSuccessQuoteRoute = require('./emailDestinations/sendEmailCustomeSuccessQuote');
const sendEmailCustomerSuccessBookRoute = require('./emailDestinations/sendEmailCustomeSuccessBook');
const sendEmailSupplierRoute = require('./emailDestinations/sendEmailSupplier');

router.use('/sendEmailCustomer', sendEmailCustomerRoute)
router.use('/sendEmailCustomeSuccessQuote', sendEmailCustomerSuccessQuoteRoute)
router.use('/sendEmailCustomeSuccessBook', sendEmailCustomerSuccessBookRoute)
router.use('/sendEmailSupplier', sendEmailSupplierRoute)

module.exports = router;
