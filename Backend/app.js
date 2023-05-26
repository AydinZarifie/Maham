const express = require('express');
const path = require('path');
const multer = require('multer');
const mainPage_Router = require('./routes/adminPage');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

/* ERROR HANDLING 
  process.on('uncaughtException', err => {
      console.log('UNCAUGHT EXCEPTION! Shutting down...');
      console.log(err.name, err.message);
      process.exit(1);
  });
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // change the destination folder as per your requirement
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});

const fileFilter = function (req, file, cb) {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

//2023/05/08 >> changed bodyparser.json() to express.json() ; express.json() is a built-in middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(upload.any('image'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//2023/05/08 changed main route from 'adminPgae' to 'admin'
app.use('/admin', mainPage_Router);

////////////////////////////////////////////////
/* ERROR HANDLING  

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
*/

/* ERROR HANDLING
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!);
  console.log(err.name, err.message);
});
*/
