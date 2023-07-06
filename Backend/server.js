const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// ERROR HANDLING
process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

const app2 = require('./app');
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
// 	);
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	next();
// });

const DB = process.env.LOCAL_DATABASE;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('>>> DB connection successful!\n');
	});

const port = process.env.PORT || 3000;
app2.listen(port, () => {
	console.log(`>>> listenning to the port ${port} ...`);
});

// ERROR HANDLING
process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION!');
	console.log(err.name, err.message);
});
