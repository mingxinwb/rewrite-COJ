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

app.listen(3000, () => {
    console.log('Example app listening on port 3000.');
});

