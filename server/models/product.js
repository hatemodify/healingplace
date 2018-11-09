const mongoose = require('mongoose');
const Schema = mongoose.schema;
const PRODUCT_MODEL = {
  shop_Id: {
    type: String,
    require: true
  },
  shop_region: {
    type: String,
    require: true
  }
};
