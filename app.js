const express= require("express");
const bodyParser= require("body-parser");
const { listen } = require("express/lib/application");
const app= express();

const url = require('url');

app.use(bodyParser.json());

const products = require('./routes/products');
const clients = require('./routes/clients');
const bills = require('./routes/bills');

app.use('/api/products', products);
app.use('/api/clients', clients);
app.use('/api/bills', bills);

app.listen(3001);

