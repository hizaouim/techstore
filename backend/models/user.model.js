const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    username : { type: String },
    email : { type: String },
    password : { type: String },
    first_name : { type: String },
    last_name : { type: String },
    address : { type : String},
    Tel : {type: Number}
}
,
{
    timestamps: true,
});

  const User = mongoose.model('User', userSchema)
  module.exports = User