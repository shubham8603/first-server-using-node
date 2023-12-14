const fs = require('fs').promises;

async function handleDefaultRoute(req, res) {
    try {
        const data = await fs.readFile('messages.txt', 'utf8');
        const latestMessage = (data || '').trim();

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>');

        if (latestMessage !== '') {
            res.write(`<p>${latestMessage}</p>`);
        }

        res.write('<form method="POST" action="/submit">');
        res.write('<label for="message">Enter your message:</label>');
        res.write('<input type="text" name="message" id="message">');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
    } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function handleSubmitRoute(req, res) {
    const body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', async () => {
        try {
            const data = Buffer.concat(body).toString();
            const formData = new URLSearchParams(data);
            const message = formData.get('message');

            await fs.writeFile('messages.txt', `${message}\n`);
            res.writeHead(303, { 'Location': '/thank-you' });
            res.end();
        } catch (error) {
            console.error('Error writing to file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });
}

module.exports = {
    handleDefaultRoute,
    handleSubmitRoute,
};
