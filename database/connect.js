const mongoose = require('mongoose');
const { color } = require('../lib/color.js');

// Perbarui URL koneksi MongoDB Atlas dengan yang direkomendasikan
const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/myDatabase?retryWrites=true&w=majority';

function connectMongoDb() {
   mongoose.connect(uri, { 
       useNewUrlParser: true,
       useUnifiedTopology: true,
       serverSelectionTimeoutMS: 30000, // Sesuaikan timeout koneksi
       writeConcern: {
           w: 'majority',
           wtimeout: 5000,
       },
   })
   .then(() => {
       console.log(color('[INFO] Connect to DB success!','red'));
   })
   .catch((error) => {
       console.error('Connection error:', error);
   });

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
};

module.exports.connectMongoDb = connectMongoDb;
