const mongoose = require('mongoose');
const dotenv = require('dotenv');

// error handling
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION , server shutting down ...'); // errors from sync functions
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.LOCAL_DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`DB connection sucessful`);
});

const port = 5000;
const server = app.listen(port, () => {
    console.log(`>>> listenning to the port ${port} ...`);
});

// error handling
process.on('unhandledRejection', (err) => {
    console.log('UNHANDELED REJECTION , server shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1); // 0 : sucess & 1 : rejection
    });
});
