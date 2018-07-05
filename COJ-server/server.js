const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user123@ds125841.mlab.com:25841/rewritecoj');

app.get('/', (req, res) => {
    res.send('Hello Woolaa!');
});

app.use('/api/v1', restRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000.');
});

