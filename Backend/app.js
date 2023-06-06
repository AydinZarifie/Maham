const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const adminPageRouter = require('./routes/adminPageRouter');
const bodyParser = require('body-parser');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'images') {
            cb(null, `./uploads/estate-${req.body.title}/images/`);
        } else if (file.fieldname === 'video') {
            cb(null, `./uploads/${req.body.title}/videos/`);
        }
    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'images') {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        } else if (file.fieldname === 'video') {
            cb(
                null,
                file.fieldname + '-' + Date.now() + '.mp4'
                // file.fieldname + Date.now() + path.extname(file.originalname)
            );
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
            fiel.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(new Error('image type not supported!'), false);
        }
    }
}

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 20, // 20 MB
    //     file: 50,
    // },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).fields([
    {
        name: 'image',
        // maxCount: 25,
    },
    {
        name: 'video',
        // maxCount: 5,
    },
]);

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

//2023/05/08 >> changed bodyparser.json() to express.json() ; express.json() is a built-in middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    'uploads/static/',
    express.static(path.join(__dirname, '/uploads/static'))
);

app.use(upload);
app.use('/admin', adminPageRouter);

////////////////////////////////////////////////
//ERROR HANDLING
app.all('*', (req, res, next) => {
    // for handling hitting the undefined routes
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
