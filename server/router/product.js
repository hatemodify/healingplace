const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PRODUCT = require('../models/product')
const SHOP = require('../models/shop')
const REVIEW = require('../models/review')
const utils = require('../utils')
const multer = require('multer')
const crypto = require('crypto')
const requestIp = require('request-ip')

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

router.post('/addProduct', upload, (req, res) => {
  const PRODUCT_DATA = req.body
  console.log(req.body)
  let NEW_PRODUCT = new PRODUCT({
    shop_id: PRODUCT_DATA.shopId,
    shop_info: PRODUCT_DATA._id,
    title: PRODUCT_DATA.title,
    reservation: PRODUCT_DATA.reservation,
    price_data: JSON.parse(PRODUCT_DATA.priceData),
    thumbnail: req.files,
    detail: PRODUCT_DATA.detail,
    terms1: PRODUCT_DATA.terms1,
    category: PRODUCT_DATA.category
  })

  const ADD_REVIEW = new REVIEW({
    product_id: NEW_PRODUCT._id
  })

  NEW_PRODUCT.review = ADD_REVIEW._id
  NEW_PRODUCT.save(err => {
    if (err) {
      return err
    }
    console.log('success')
  })
  ADD_REVIEW.save()
  res.end()
})

router.get('/productslist/:type/:value', (req, res) => {
  console.log(req.params)
  let obj = {}
  obj[req.params['type']] = req.params['value']
  console.log(obj)
  PRODUCT.find(obj, (err, data) => {
    res.send(data)
  })
})
router.get('/productslist', (req, res) => {
  console.log('ipis', requestIp.getClientIp(req))
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`ipppppp : ${ip}`)
  PRODUCT.find({}, (err, data) => {
    res.send(data)
  })
})

router.get('/productdetail/:_id', (req, res) => {
  const ID = req.params._id
  PRODUCT.findOne({ _id: ID })
    .populate('review shop_info')
    .then(data => {
      res.send(data)
    })
})

router.post('/productdetail/:_id', (req, res) => {
  const _id = req.params._id
  const REVIEW_DATA = req.body
  REVIEW_DATA.created = utils.getDate(new Date())
  // REVIEW.findOneAndUpdate(
  //   {
  //     product_id: _id
  //   },
  //   {
  //     $push: {
  //       review_list: REVIEW_DATA
  //     }
  //   },
  //   {
  //     upsert: true
  //   },
  //   () => {
  //     const ADD_REVIEW = new REVIEW({
  //       product_id: _id,
  //       review_list: {
  //         author: REVIEW_DATA.author,
  //         content: REVIEW_DATA.content,
  //         created: REVIEW_DATA.created
  //       }
  //     })
  //   }
  // ).then(data => {
  //   REVIEW.update({ product_id: _id }, { rate_avg: 777 })
  //   res.send()
  // })
  REVIEW.find({ product_id: _id }).then(data => {
    const len = data[0].review_list.length + 1

    REVIEW.update(
      { product_id: _id },
      {
        $push: {
          review_list: REVIEW_DATA
        },
        rate_avg: (data[0].rate_avg + Number(REVIEW_DATA.rate)) / len
      }
    ).then(result => {
      res.send(result)
    })
  })
})

const rate = id => {
  REVIEW.aggregate([
    {
      $match: {
        product_id: mongoose.Types.ObjectId(id)
      }
    },
    { $unwind: '$review_list' },
    {
      $group: {
        _id: null,
        rate_avg: { $avg: '$review_list.rate' }
      }
    }
  ])
}

module.exports = router
