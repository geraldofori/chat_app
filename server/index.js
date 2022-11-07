const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);


const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
});

const port = process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log(`Listening on port : ${port}`);
})

io.on('connection', (socket)=> {

    socket.on('message', (msg) => {
        // socket.join(data.room);
        socket.broadcast.emit('message',{user: msg.user, message: msg.message});
      });

    socket.on('disconnect', () => {
        console.log('User is disconnected!');
      });

});
