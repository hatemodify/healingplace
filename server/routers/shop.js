const express = require('express')
const router = express.Router()
const SHOP = require('../models/shop')
const PRODUCT = require('../models/product')
const REVIEW = require('../models/review')
const multer = require('multer')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, '../client/upload/thumb')
  },
  filename: (req, files, cb) => {
    if (files) {
      crypto.pseudoRandomBytes(4, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + files.originalname)
      })
    }
  }
})
const upload = multer({ storage: storage }).array('thumbnail')

router.post('/addShop', upload, (req, res) => {
  const SHOP_DATA = req.body

  const NEW_SHOP = new SHOP({
    shop_id: SHOP_DATA.shopId,
    shop_name: SHOP_DATA.shopName,
    shop_password: SHOP_DATA.password,
    shop_address: SHOP_DATA.address,
    shop_phone_number: SHOP_DATA.phone1,
    cell_phone_number: SHOP_DATA.phone2,
    shop_personal_day: SHOP_DATA.personalDay,
    category: SHOP_DATA.category,
    shop_level: SHOP_DATA.level,
    reservation: SHOP_DATA.reservation,
    price_data: JSON.parse(SHOP_DATA.priceData),
    thumbnail: req.files,
    detail: SHOP_DATA.detail,
    terms1: SHOP_DATA.terms1,
    location: {
      type: 'Point',
      coordinates: [Number(SHOP_DATA.longitude), Number(SHOP_DATA.latitude)]
    }
  })

  const ADD_REVIEW = new REVIEW({
    product_id: NEW_SHOP._id
  })

  NEW_SHOP.review = ADD_REVIEW._id
  NEW_SHOP.save(err => {
    if (err) {
      console.error(err)
      res.json({ result: 0 })
      return
    }
    ADD_REVIEW.save()
    console.log(res)
    res.end()
  })
})

router.get('/addProduct/:shopid', (req, res) => {
  SHOP.find({ shop_id: req.params.shopid }, (err, data) => {
    res.send(data[0])
  })
})

router.get('/shopList/:type/:value', (req, res) => {
 
  let obj = {}
  obj[req.params['type']] = req.params['value']
  
  SHOP.find(obj, (err, data) => {
    console.log(data)
    res.send(data)
  })
})



module.exports = router
