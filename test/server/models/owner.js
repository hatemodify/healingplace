const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OWNER_MODEL ={
  id:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  },
}