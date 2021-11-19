const express = require('express');
const router = express.Router();

const sendEmailCustomerRoute = require('./emailDestinations/sendEmailCustomer');
const sendEmailCustomerSuccessRoute = require('./emailDestinations/sendEmailCustomeSuccess');
const sendEmailSupplierRoute = require('./emailDestinations/sendEmailSupplier');

router.use('/sendEmailCustomer', sendEmailCustomerRoute)
router.use('/sendEmailCustomeSuccess', sendEmailCustomerSuccessRoute)
router.use('/sendEmailSupplier', sendEmailSupplierRoute)

module.exports = router;
