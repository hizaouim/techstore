const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const CartSchema = new Schema (
{
    user : { type: String },
    articleId : { type: String }
}
,
{
    timestamps: true,
}
);

  const Cart = mongoose.model('Cart', CartSchema)
  module.exports = Cart