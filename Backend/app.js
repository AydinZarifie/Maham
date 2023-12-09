const cookieParser = require('cookie-parser');
const express = require('express');

const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');

//////////////////////////////////////////////
const adminPage_Router = require('./routes/admin/adminPage');
const managmentPage_Router = require('./routes/admin/adminManagment');
const adminAuth_Router = require('./routes/admin/adminAuth');
const adminPanel_Router = require('./routes/admin/adminPanel');
const transaction_Router = require("./routes/admin/transaction");
const userAuthorization_Router = require('./routes/user/userAuthorization');
const userPanel_Router = require('./routes/user/userPanel');
const userAuth_Router = require('./routes/user/userAuth');
//////////////////////////////////////////////
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const AppError = require('./utilities/error/appError');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config({ path: './config.env' });

const app = express();

// ERROR HANDLING
process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);``
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
			} else if (req.body.filterName) {
				cb(null, './uploads/images/filters/');
			} else if (req.body.countryName && !req.body.title) {
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

const upload = multer({
	storage: storage,
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

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(globalErrorHandler);
app.use(
	session({
		secret: process.env.SESSION_SECRET_KEY,
		saveUninitialized: false,
		resave: false,
		cookie: {
			secure: false,
			maxAge: 70 * 1000,
		},
	})
);
app.use(cookieParser());
//2023/05/08 >> changed bodyparser.json() to express.json() ; express.json() is a built-in middleware
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use(
	'uploads/static/',
	express.static(path.join(__dirname, '/uploads/static'))
);

app.use(upload);

//2023/05/08 changed main route from 'adminPgae' to 'admin'

app.use('/admin', adminAuth_Router);

app.use('/admin', adminPage_Router, managmentPage_Router, adminPanel_Router,transaction_Router);

app.use('/user', userAuthorization_Router, userPanel_Router, userAuth_Router);

mongoose.connect('mongodb://127.0.0.1:27017/Maham').then(() => {
	console.log(`DB connection sucessful`);
	app.listen(5000, () => {
		console.log(`Server is runing on port 5000`);
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
