// Fungsi Kirim Pesan (HTTP POST)
async function kirim() {
    const input = document.getElementById('input');
    const text = input.value.trim();
    if (text === '') return;

    // Kirim ke server
    await fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });

    input.value = '';
    ambilPesan();
}

// Fungsi Ambil Pesan (HTTP GET)
async function ambilPesan() {
    const response = await fetch('/get-messages');
    const data = await response.json();
    
    const container = document.getElementById('messages');
    container.innerHTML = ''; 

    data.forEach(msg => {
        const item = document.createElement('div');
        item.classList.add('message', 'other'); 
        item.textContent = msg.text;
        container.appendChild(item);
    });
    
    container.scrollTop = container.scrollHeight;
}

// JALANKAN POLLING: Otomatis cek server setiap 2 detik
setInterval(ambilPesan, 2000);

document.getElementById('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') kirim();
});

// web socket
// var socket = io();

// function kirim() {
//     var input = document.getElementById('input');
    
//     if (input.value.trim() === '') return;

//  
//     var item = document.createElement('div');
//     item.classList.add('message', 'me'); // Pastikan ini 'me' sesuai CSS
//     item.textContent = input.value;
//     document.getElementById('messages').appendChild(item);

//     // 2. Kirim pesan ke server
//     socket.emit('kirim_pesan', input.value);
    
//     input.value = '';
//     scrollBawah();
// }

// // Fitur Tombol Enter
// document.getElementById('input').addEventListener('keypress', function(e) {
//     if (e.key === 'Enter') {
//         kirim();
//     }
// });

// // 3. Terima pesan dari ORANG LAIN (Muncul di KIRI)
// socket.on('terima_pesan', function(msg) {
//     var item = document.createElement('div');
//     item.classList.add('message', 'other'); // Pastikan ini 'other' sesuai CSS
//     item.textContent = msg;
//     document.getElementById('messages').appendChild(item);
    
//     scrollBawah();
// });

// // Fungsi otomatis scroll ke bawah
// function scrollBawah() {
//     var messagesDiv = document.getElementById('messages');
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

// // Notifikasi Sistem
// const systemMsg = document.createElement('div');
// systemMsg.classList.add('message', 'system');
// systemMsg.textContent = 'Koneksi Berhasil - Sesi Chat Dimulai';
// document.getElementById('messages').appendChild(systemMsg);