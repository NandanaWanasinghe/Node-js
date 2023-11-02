const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//=================
require('dotenv').config();
const port = process.env.SERVER_PORT;

const customerRouter = require('./route/CustomerRoute');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.listen(port,()=>{
    console.log(`server up & running on port ${port}`);
});
app.use('/api/v1/customers', customerRouter);