const express = require('express');

const path = require('path');
const multer = require('multer');
//////////////////////////////////////////////
const adminPage_Router = require('./routes/adminPage');
const managment_Router = require('./routes/adminManagment');
//////////////////////////////////////////////
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const AppError = require('./utilities/appError');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();
// ERROR HANDLING
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'images') {
            cb(null, './uploads/images/');
        } else if (file.fieldname === 'video') {
            cb(null, './uploads/videos/');
        } else if (file.fieldname === 'logo') {
            cb(null, './uploads/logos/');
        }
    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'images') {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        } else if (file.fieldname === 'video') {
            cb(
                // file.fieldname + Date.now() + path.extname(file.originalname)
                null,
                file.fieldname + '-' + Date.now() + '.mp4'
            );
        } else if (file.fieldname === 'logo') {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        }
    },
});

function checkFileType(file, cb) {
    if (file.fieldname === 'video') {
        if (
            file.mimetype === 'video/mp4' ||
            file.mimetype === 'video/jpeg' ||
            file.mimetype === 'video/mpv' ||
            file.mimetype === 'video/quicktime'
        ) {
            cb(null, true);
        } else {
            cb(new Error('video type not supported!'), false);
        }
    } else if (file.fieldname === 'images') {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(new Error('image type not supported!'), false);
        }
    } else if (file.fieldname === 'logo') {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(new Error('logo type not supported!'), false);
        }
    }
}

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).fields([
    {
        name: 'images',
    },
    {
        name: 'video',
    },
    {
        name: 'logo',
    },
]);

app.use(globalErrorHandler);

//2023/05/08 >> changed bodyparser.json() to express.json() ; express.json() is a built-in middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(
    'uploads/static/',
    express.static(path.join(__dirname, '/uploads/static'))
);

app.use(upload);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

//2023/05/08 changed main route from 'adminPgae' to 'admin'
app.use('/admin', adminPage_Router);
app.use('/admin', managment_Router);

mongoose.connect('mongodb://127.0.0.1:27017/maham').then(() => {
    console.log(`DB connection sucessful`);
    app.listen(5000, () => {
        console.log(`Server is runing on port`);
    });
});

/////////////////////////////////////////////
// ERROR HANDLING

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION!');
    console.log(err.name, err.message);
});
