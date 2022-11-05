const app = require('express')();

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer,{
    cors: { origin: '*'}
});

const port = process.env.PORT || 3001;



io.on('connection', (socket)=> {
    console.log('User is connected!');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
      });

    socket.on('disconnect', () => {
        console.log('User is disconnected!');
      });

});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));