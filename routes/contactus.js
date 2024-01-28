

const express = require('express');
const router = express.Router();

const contactusController = require('../controllers/contactus')

router.get('/contactus', contactusController.getContactUs );

router.post('/contactus', contactusController.postContactus );

module.exports = router;
