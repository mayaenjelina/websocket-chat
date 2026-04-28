//http
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.json()); // Penting: Supaya server bisa baca kiriman teks JSON

let messages = []; 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Jalur khusus untuk ngambil daftar pesan
app.get('/get-messages', (req, res) => {
    res.json(messages);
});

// Jalur khusus untuk ngirim pesan
app.post('/send-message', (req, res) => {
    const text = req.body.text;
    if (text) {
        // Kita simpan ke memori server
        messages.push({ text: text }); 
        res.status(200).send('OK');
    }
});

app.listen(3000, () => {
    console.log('Server HTTP Polling jalan di http://localhost:3000');
});

// web socket server menggunakan Node.js dan Socket.IO
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// app.use(express.static(__dirname));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log('User terhubung!');
//     socket.on('kirim_pesan', (msg) => {
//        socket.broadcast.emit('terima_pesan', msg);
//     });
// });

// http.listen(3000, () => {
//     console.log('Server running di http://localhost:3000');
// });