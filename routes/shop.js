const path = require('path');

const express = require('express');


const router = express.Router();

const productController = require('../controller/product.js')


router.get('/',productController.getProducts);


module.exports = router;