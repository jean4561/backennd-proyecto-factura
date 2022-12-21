const express= require("express");
const bodyParser= require("body-parser");
const { listen } = require("express/lib/application");
const cors = require('cors');
const app= express();

app.use(cors({
    origin: '*'
}));

const url = require('url');

app.use(bodyParser.json());

const products = require('./routes/products');
const clients = require('./routes/clients');
const bills = require('./routes/bills');

app.use('/api/products', products);
app.use('/api/clients', clients);
app.use('/api/bills', bills);

app.listen(3001);

