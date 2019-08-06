const mongoose = require('mongoose')
const Schema = mongoose.Schema

const USER_MODEL = {
  Eea: {
    type: String
  },
  user_name: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  wish: {
    type: Array
  },
  cart:{
    type:Array
  }
}

const userSchema = new Schema(USER_MODEL)
module.exports = mongoose.model('user', userSchema)
