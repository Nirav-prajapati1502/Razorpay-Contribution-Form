const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const db = require('./src/db');
require('dotenv').config();

const { sequelize } = require('./src/db');
const contributionRouter = require('./src/contributionRouter');
// const { handleWebhook } = require('./src/webhookController');

app.use(cors());
app.use(bodyParser.json());

app.use('/', contributionRouter);
// app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

let Port = 5000;

http.listen(Port)
console.log(`The app is running on post ${Port}`)