const express = require('express');
// const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
//////////////////////////////////////////////
const adminPage_router = require('./routes/admin/adminPage');
const managmentPage_router = require('./routes/admin/adminManagment');
const adminAuth_router = require('./routes/admin/adminAuth');
const adminPanel_router = require('./routes/admin/adminPanel');
//////////////////////
const globalErrorHandler = require('./controllers/globalErrorHandler');
const AppError = require('./utilities/error/appError');
//////////////////////////////////////////////
dotenv.config({ path: './config.env' });
const app = express();
//////////////////////////////////////////////

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (file.fieldname === 'images') {
			if (req.body.title) {
				let path = `./uploads/images/estates/${req.body.countryName}_${req.body.cityName}_${req.body.title}`;

				if (fs.existsSync(path)) {
					cb(null, path);
				} else {
					fs.mkdirSync(path);
					cb(null, path);
				}
			}
			if (req.body.filterName) {
				cb(null, './uploads/images/filters/');
			} else {
				cb(null, './uploads/images/countries/');
			}
		} else if (file.fieldname == 'video') {
			cb(null, './uploads/videos/');
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
]);

//////////////////////////////////////////////
app.use(helmet());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(express.json());
app.use(hpp({ whitelist: ['price'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(
	'uploads/static/',
	express.static(path.join(__dirname, '/uploads/static'))
);
app.use(upload);

app.use(cookieParser());

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET_KEY,
// 		saveUninitialized: false,
// 		resave: true,
// 		cookie: {
// 			maxAge: 1000 * 10 * 60,
// 			sameSite: 'lax',
// 			secure: false,
// 		},
// 	})
// );

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
// 	);
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	next();
// });
// app.use(cors({ credentials: true, origin: true }));

app.use('/admin', adminPage_router);
app.use('/admin', managmentPage_router);
app.use('/admin', adminAuth_router);
app.use('/admin', adminPanel_router);

const DBlocal = process.env.LOCAL_DATABASE;
const port = process.env.PORT;
mongoose.connect(DBlocal).then(() => {
	console.log(`local DB connection sucessful`);
	app.listen(port, () => {
		console.log(`Server is runing on port ${port}`);
	});
});

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION!');
	console.log(err.name, err.message);
});
