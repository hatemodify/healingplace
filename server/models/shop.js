const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SHOP_MODEL = {
  shop_id: {
    type: String,
    require: true
  },
  shop_name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  shop_password: {
    type: String,
    require: true
  },
  shop_address: {
    type: String,
    default: ''
  },
  shop_phone_number: {
    type: String,
    require: true,
    default: null
  },
  cell_phone_number: {
    type: String,
    require: true,
    default: null
  },
  shop_personal_day: {
    type: String,
    default: null
  },
  category: {
    type: String,
    require: true
  },
  shop_join_date: {
    type: Date,
    default: Date.now
  },
  region: {
    type: String,
    default: null
  },
  shop_level: {
    type: Number,
    default: 0
  },
  shop_region: {
    type: String
  },
  title: {
    type: String
  },
  reservation: String,
  terms1: String,
  price_data: [],
  thumbnail: [],
  detail: String,
  review: {
    type: Schema.Types.ObjectId,
    ref: 'review'
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  }
}

const shopSchema = new Schema(SHOP_MODEL)
shopSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('shop', shopSchema)
