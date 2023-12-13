const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/submit' && method === 'POST') {
        // Handle form submission
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const data = Buffer.concat(body).toString();
            const formData = new URLSearchParams(data);
            const message = formData.get('message');

            // Overwrite the entire file with the new message
            fs.writeFile('messages.txt', `${message}\n`, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    // Redirect with a 302 response
                    res.writeHead(302, { 'Location': '/thank-you' });
                    res.end();
                }
            });
        });
    } else {
        // Read the latest message from the file
        fs.readFile('messages.txt', 'utf8', (err, data) => {
            if (err && err.code !== 'ENOENT') {
                console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            const latestMessage = (data || '').trim();

            // Serve the form page with the latest message
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><body>');

            // Display the latest message
            if (latestMessage !== '') {
                res.write(`<p>${latestMessage}</p>`);
            }

            // Display the form
            res.write('<form method="POST" action="/submit">');
            res.write('<label for="message">Enter your message:</label>');
            res.write('<input type="text" name="message" id="message">');
            res.write('<button type="submit">Submit</button>');
            res.write('</form>');
            res.write('</body></html>');
            res.end();
        });
    }
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
