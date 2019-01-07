const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PRODUCT_REVIEW_MODEL = {
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  review_list: [
    // {
    //   author: String,
    //   content: String,
    //   rate: Number,
    //   created: String
    // }
  ],
  rate_avg: {
    type: Number,
    default: 0
  }
}

const productReviewSchema = new Schema(PRODUCT_REVIEW_MODEL)
module.exports = mongoose.model('review', productReviewSchema)
