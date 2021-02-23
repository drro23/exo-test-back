const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const justifyRouter = require('../src/api/routes/justify');

const app = express()

app.use(helmet());
app.use(morgan('tiny'));

app.use(cors())
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', justifyRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
})

module.exports = app;
