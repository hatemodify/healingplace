const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SHOP_MODEL = {
  shop_name: {
    type: String,
    require: true
  },
  shop_address: {
    type: String,
    require: true
  },
  shop_phone_number: {
    type: String,
    require: true
  },
  shop_personal_day:{
    type:String,
  },
  shop_category:{
    type:String,
    require:true
  },
  shop_join_date:{
    type:Date,
    default:Date.now
  },
  shop_owner_id:{
    type:Date
  },
  shop_level:{
    type:Number,
    default:0
  }
};
