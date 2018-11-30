const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PRODUCT_MODEL = {
  shop_Id: {
    type: String,
    require: true
  },
  shop_region: {
    type: String,
  },
  title:{
    type:String,
  },
  reservation:String,
  price_data:[],
  thumbnail:[],
  detail:String,
};


const productSchema = new Schema(PRODUCT_MODEL);
module.exports = mongoose.model('product', productSchema);