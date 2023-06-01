// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });

// const app = require('./app');
// const DB = process.env.DATABASE_LOCAL;

// mongoose.connect('DB').then(() => {
//     console.log(`DB connection sucessful`);
//     app.listen(5000, () => {
//         console.log(`Server is runing on port ${port}`);
//     });
// });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Authorization'
//     );
//     next();
// });

// // console.log(process.env.NODE_ENV);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`>>> listenning to the port ${port} ...`);
// });
