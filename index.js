
const express = require('express');

var cors = require('cors')
// const mongoose = require('mongoose');


const connectToMongo = require("./db");

connectToMongo();
const app = express();
app.use(cors())
app.use(express.json({ extended: false }));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.join(__dirname, 'build')));
}

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => console.log(`Server running on port ${port}`));