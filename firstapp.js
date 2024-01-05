const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res) => {
    console.log("In the middleware");
    res.send('<form action="/product" method="POST">' +
             '<input type="text" name="productName" placeholder="Product Name"><br>' +
             '<input type="number" name="productsize" placeholder="Product Size"><br>' +
             '<button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res) => {
    console.log("Product Name:", req.body.productName);
    console.log("Product Size:", req.body.productsize);
    res.redirect('/');
});

app.use('/', (req, res) => {
    console.log("In the next middleware");
    res.send('<h1>Hello from express</h1>');
});

app.listen(4000);