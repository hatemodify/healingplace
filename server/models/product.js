const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PRODUCT_MODEL = {
  shop_id: {
    type:String,
    ref: 'shop' 
  },
  shop_info: {
    type: Schema.Types.ObjectId, 
    ref: 'shop' 
  },
  shop_name: {
    type: String
  },
  shop_region: {
    type: String
  },
  title: {
    type: String
  },
  category: String,
  shop_address: String,
  reservation: String,
  shop_personal_day: String,
  terms1: String,
  price_data: [],
  thumbnail: [],
  detail: String,
  review:{
     type: Schema.Types.ObjectId, 
     ref: 'review' 
  },
};

const productSchema = new Schema(PRODUCT_MODEL);
module.exports = mongoose.model('product', productSchema);