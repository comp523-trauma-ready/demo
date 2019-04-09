// connect to mongoose
let mongoose = require('mongoose');
//
// const server = 'ds253094.mlab.com:53094';
// const database = 'heroku_57zg6qts';
// const user = 'user';
// const password = 'comp523';
//
// // the connection string to connect with the database
// mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true },
//     (err) => {
//         if (!err) {
//             console.log('MongoDB Connection Successful');
//         } else {
//             console.log(`Error in DB connection : ${err}`);
//         }
//     }
// );
console.log('Hello');
console.log(process.env.MONGODB_URI);
let uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useMongoClient: true });

// connect with student.model
