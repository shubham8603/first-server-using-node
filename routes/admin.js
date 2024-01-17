const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res,next) => {
   console.log('hi');
    res.send('<form action="add-product" method="POST">' +
             '<input type="text" name="productName" placeholder="Product Name"><br>' +
             '<input type="number" name="productsize" placeholder="Product Size"><br>' +
             '<button type="submit">Add Product</button></form>');
});
router.post('/product',(req, res, next) => {
    console.log("hello");
        console.log(req.body);
        res.redirect('/');
    });

module.exports = router;