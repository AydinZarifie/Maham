// 2023/05/08 added this file , this field is specified to starting the server

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require("express");
const app = express();

