const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose(); // Add this

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Setup SQLite (either in-memory or file-based)
const db = new sqlite3.Database('./chat.sqlite');

// Create a messages table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_user TEXT,
        text TEXT,
        created_at INTEGER
    )
`);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    // Send existing messages to the new user
    db.all("SELECT * FROM messages ORDER BY id ASC", (err, rows) => {
        if (!err) {
            rows.forEach(msg => {
                socket.emit('newMessage', {
                    from: msg.from_user,
                    text: msg.text,
                    createdAt: msg.created_at
                });
            });
        }
    });

    socket.on('createMessage', (message) => {
        console.log('New message:', message);

        // Save message to database
        db.run(
            "INSERT INTO messages (from_user, text, created_at) VALUES (?, ?, ?)",
            [message.from, message.text, message.createdAt],
            function(err) {
                if (err) {
                    return console.error(err.message);
                }

                // Emit saved message to all clients
                io.emit('newMessage', {
                    id: this.lastID,
                    from: message.from,
                    text: message.text,
                    createdAt: message.createdAt
                });
            }
        );
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

