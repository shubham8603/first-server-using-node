
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'contactus.html'));
});

router.post('/contactus', (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
});

module.exports = router;
