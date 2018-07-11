const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user123@ds125841.mlab.com:25841/rewritecoj', { useNewUrlParser: true });

// app.get('/', (req, res) => {
//     res.send('Hello Woolaa!');
// });

app.use('/api/v1', restRouter);
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
})

// app.listen(3000, () => {
//     console.log('Example app listening on port 3000.');
// });
const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService')(io);
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    throw error;
}

function onListening() {
    const addr = server.address();
    console.log('Listening on port ' + addr.port);
}
