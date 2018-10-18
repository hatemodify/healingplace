const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SHOP_MODEL = {
  shop_name: {
    type: String,
    require: true,    
  },
  shop_address: {
    type: String,
    default:''
  },
  shop_phone_number: {
    type: String,
    require: true,
    default:null
  },
  shop_personal_day:{
    type:String,
    default:null
  },
  shop_category:{
    type:String,
    require:true
  },
  shop_join_date:{
    type:Date,
    default:Date.now
  },  
  region:{
    type:String,
    default:null
  },
  // shop_owner_id:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'OWNER_MODEL'
  // },
  shop_level:{
    type:Number,
    default:0
  }
};
const shopSchema = new Schema(SHOP_MODEL)
module.exports = mongoose.model('shop', shopSchema);
