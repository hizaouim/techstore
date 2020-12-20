const router = require ('express').Router()
const Article = require('../models/article.model')
const bodyParser = require('body-parser')
const path= require('path')
const crypto = require('crypto')
const multer = require('multer')
const MulterGridfsStorage = require('multer-gridfs-storage')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream')


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useCreateIndex: true}
  );
let gfs
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
// create storage engine
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
  

router.route('/files').get ( (req, res) =>{
//  console.log('gfs from article '+ JSON.stringify(gfs));
  gfs.files.find().toArray((err, files) =>{
    if (!files || files.lenght === 0 ){
      return res.status (404).json ({
        err : 'No files'
      })
    }
    return res.json (files)
  })
})


  
router.route('/byCategory/:id').get((req, res) => {
    Article.find( { category : req.params.id })
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/').get((req, res) => {
  Article.find()
  .then(articles => {
    res.json(articles)
  })
  .catch(err => res.status(400).json('Error' + err))
})

router.route('/image/:filename').get((req, res) => {

gfs.files.findOne ({ filename : req.params.filename}, (err, file )=>{
  if (!file || file.length === 0 )
  {
    return res.status(404) .json ({
      err: 'no file exists!'
    })
  }
   var readStream = gfs.createReadStream (file.filename)
   readStream.pipe (res)      
})
})  

router.route('/:id').get((req, res) => {
    Article.findById( req.params.id)
    .then(article => res.json(article))
      .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').delete((req, res) => {
    Article.findByIdAndDelete(req.params.id)
    .then(article => res.json('article deleted' ))
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/update/:id').post((req, res) => {
    Article.findById(req.params.id)
    .then(article => 
        {
            article.name = req.body.username 
            article.brand = req.body.brand
            article.year = req.body.year
            article.color = req.body.color
            article.price = req.body.price
            article.condition = req.body.condition 
        article.save()
        .then(res.json(article))
        .catch(err => res.status(400).json('Error' + err))
    })
    .catch(err => res.status(400).json('Error' + err))
})

function fileUpload(req, res, next) {
  upload.single('file')(req, res, next);
  console.log('bef next');
  next();
}


// @route POST
// upload file
router.route('/upload').post(fileUpload, function(req, res) {
    console.log('call');
    console.log('json' + JSON.stringify(req.file));
    res.json( {file: req.file})
})
  

router.route('/add').post((req, res) => {
    const title = req.body.title
    const brand = req.body.brand
    const year = Number (req.body.year)
    const color =  (req.body.color)
    const price = Number (req.body.price)
    const condition =  (req.body.condition)
    const category =  (req.body.category)
    const image =  (req.body.image)
    
    
    
    const newArticle = new Article ({
                            title,
                            brand,
                            year,
                            color,
                            price,
                            condition,
                            category   ,
                            image 
                        })

    newArticle.save()
    .then(()=> res.json('Article added'))
    .catch(err => res.status(400).json('Error ' + err))



})

module.exports = router