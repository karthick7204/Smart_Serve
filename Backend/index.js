const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// You can add: app.use('/api/orders', require('./routes/orderRoutes'));

io.on('connection', socket => {
    console.log("New client connected");

    socket.on('orderUpdate', data => {
        io.emit('orderStatusChanged', data); // broadcast to all
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
