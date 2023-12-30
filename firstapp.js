const express = require('express');
const routes = require('./routes');
const app = express();

app.use((req, res, next) => {
    console.log("In the 1st middleware");
    next(); // Allow the request to continue to the next middleware in the line
});

app.use((req, res, next) => {
    console.log("In the 2nd middleware");
    res.send('<h1>Hello world</h1>');
});

app.post('/submit', (req, res) => {
    // Handle the /submit route for POST requests
    res.send('Handling submit route for POST request');
});

app.post('/about', (req, res) => {
    // Handle the /about route for POST requests
    res.send('Handling about route for POST request');
});

app.use((req, res) => {
    // Handle default route
    res.send('Handling default route');
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
