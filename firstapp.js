const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url, req.method, req.headers);
    //process.exit()
    res.setHeader('content-type', 'text/html');

    if (url === '/home') {
        res.write('<html><body><h1>Welcome home</h1></body></html>');
    } else if (url === '/about') {
        res.write('<html><body><h1>Welcome to About Us page</h1></body></html>');
    } else if (url === '/node') {
        res.write('<html><body><h1>Welcome to my Node Js project</h1></body></html>');
    } else {
        res.write('<html><body><h1>Page not found</h1></body></html>');
    }

    res.end();
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
