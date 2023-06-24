/* simple webserver which hosts a redirect page
- listens on process.env.SPOTIFY_REDIRECT_URI
- extracts an url parameter called 'code'
- presents the user with a simple message if the code was successfully found in the url
- saves the code to file called 'code.txt'
*/

const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const port = process.env.PORT || 8888;

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);
    const { code } = querystring.parse(query);
    if (pathname === '/favicon.ico') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    } else if (pathname === '/callback') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Success! You can close this window now.</h1>');
        res.end();
        fs.writeFile('code.txt', code, (err) => {
        if (err) throw err;
        console.log('Saved!');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
    }
);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}
);



