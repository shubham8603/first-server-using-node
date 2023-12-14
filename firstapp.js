const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/submit' && method === 'POST') {
        routes.handleSubmitRoute(req, res);
    } else {
        routes.handleDefaultRoute(req, res);
    }
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
module.exports = server;
