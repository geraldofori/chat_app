// const express = require('express');
//
// const app = express();
//
// const http = require('http');
//
// const cors = require('cors');
//
// const server = http.createServer(app);
//
//
// const {Server} = require('socket.io');
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     },
// });
//
// const port = process.env.PORT || 3000;
//
// server.listen(port, ()=>{
//     console.log(`Listening on port : ${port}`);
// })
//
// io.on('connection', (socket)=> {
//
//     socket.on('message', (msg) => {
//         // socket.join(data.room);
//         socket.broadcast.emit('message',{user: msg.user, message: msg.message});
//       });
//
//     socket.on('disconnect', () => {
//         console.log('User is disconnected!');
//       });
//
// });
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

// app.get('/', (req, res) => {
//     res.send('Heello world');
// })

let userList = new Map();

io.on('connection', (socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    })

    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id);
    })
});

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        if (userIds.size == 0) {
            userList.delete(userName);
        }
    }
}

http.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running ${process.env.PORT || 3000}`);
});
