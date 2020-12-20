const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema (
{
    title : { type: String },
    brand : { type: String },
    year : { type: Number },
    color : { type: String },
    price : { type: Number },
    condition :{ type: String } ,
    title : { type: String},
    category : { type : String},
    image : {type : String}
}
,
{
    timestamps: true,
}
);

  const Article = mongoose.model('Article', articleSchema)
  module.exports = Article