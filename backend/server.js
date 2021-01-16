const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path= require('path')
const crypto = require('crypto')
const multer = require('multer')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const MulterGridfsStorage = require('multer-gridfs-storage')



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(methodOverride('_method'))
app.use(cors());
app.use(express.json());

let gfs

console.log('URI>>>'+uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useCreateIndex: true}
);
const connection = mongoose.connection;
connection
.once('open', function () {
  gfs = Grid(connection.db, mongoose.mongo)
  gfs.collection('uploads')
  console.log('MongoDB running');
})
.on('error', function (err) {
  console.log(err);
});
console.log('after conn');
const storage = new MulterGridfsStorage(  {
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        console.log('prom');
        crypto.randomBytes(16, (err, buf) => {
        console.log('cryp');
        if (err) {
          console.log('func');  
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        console.log('func2');
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
console.log('after multer');

//once('open', () => {
 // console.log("MongoDB database connection established successfully");
//})

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const categoryRouter = require('./routes/categories');
const cartRouter = require('./routes/cart');
const accRouter = require('./routes/users');

app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
app.use('/categories' , categoryRouter);
app.use('/cart' , cartRouter);
app.use('/user' , accRouter);

// @route POST
// upload file
app.post('/upload',upload.single('file'), function(req, res) {
    console.log('call');
    console.log('jsonfromserv' + JSON.stringify(req.file));
    res.json( {file: req.file})
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports.gfs = {gfs}