const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PRODUCT_REVIEW_MODEL = {
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  review_list:[]
};

const productReviewSchema = new Schema(PRODUCT_REVIEW_MODEL);
module.exports = mongoose.model('review', productReviewSchema);
