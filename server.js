const WebSocket = require('ws')
const os = require('os')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const wss = new WebSocket.Server({ port: PORT });
const clients = new Set(); 

// URL example: ws://my-server?token=my-secret-token
wss.on('connection', (ws, req) => {
    //console.log(req)
    console.log(`Client connected: ${req.headers['sec-websocket-key']}`);

    // Check valid token (set token in .env as TOKEN=my-secret-token )
    const urlParams = new URLSearchParams(req.url.slice(1));
    if (urlParams.get('token') !== process.env.PASTEBIN_TOKEN) {
        console.log('Invalid token: ' + urlParams.get('token'));
        ws.send(JSON.stringify({
            status: 1,
            msg: 'ERROR: Invalid token.'
        }));
        ws.close();
    }

    if (!clients.has(ws)) {
        clients.add(ws)
    }
    console.log(`Client count: ${clients.size}`)

    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Send a response back to the client along with some other info
        ws.send(JSON.stringify({
            status: 0,
            msg: String(message).toUpperCase(),
            freemem: Math.round(os.freemem() / 1024 / 1024), // MB
            totalmem: Math.round(os.totalmem() / 1024 / 1024) // MB
        }));
    });

    ws.on('close', () => {
        clients.delete(ws)
        console.log('Client disconnected');
    });
});
