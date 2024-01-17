const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<h1>Hello from shop</h1>');
    console.log('shop');
});

module.exports = router;
