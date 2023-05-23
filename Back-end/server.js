// 2023/05/08 added this file , this field is specified to starting the server

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Maham').then(() => {
    app.listen(5000, () => {
        console.log(`Server is runing on port...!`);
    });
});
