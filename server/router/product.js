const express = require('express')
const router = express.Router()
const PRODUCT = require('../models/product')
const SHOP = require('../models/shop')
const REVIEW = require('../models/review')

router.post('/addProduct', (req, res) => {
  const PRODUCT_DATA = req.body
  const NEW_PRODUCT = new PRODUCT({
    shop_id: PRODUCT_DATA.shopId,
    title: PRODUCT_DATA.title,
    reservation: PRODUCT_DATA.reservation,
    price_data: PRODUCT_DATA.priceData,
    thumbnail: PRODUCT_DATA.thumbnail,
    shop_name: PRODUCT_DATA.shop_name,
    detail: PRODUCT_DATA.detail,
    shop_address: PRODUCT_DATA.shop_address,
    shop_personal_day: PRODUCT_DATA.shop_personal_day,
    terms1: PRODUCT_DATA.terms1
  })

  NEW_PRODUCT.save(err => {
    if (err) {
      console.error(err)
      res.json({ result: 0 })
      return
    } else {
      console.log('success')
    }
    res.end()
  })
})

router.get('/productlist/:type/:value', (req, res) => {
  let obj = {}
  obj[req.params['type']] = req.params['value']
  PRODUCT.find(obj, (err, data) => {
    res.send(data)
  })
})
router.get('/productlist', (req, res) => {
  PRODUCT.find({}, (err, data) => {
    res.send(data)
  })
})

router.get('/productdetail/:_id', (req, res) => {
  const ID = req.params._id
  PRODUCT.find({ _id: ID }, (err, productData)=>{
    console.log(productData[0])
    res.send(
      productData[0]
    )
  })

  // REVIEW.find({ relation: ID }, (err, reviewData) => {})

})

router.post('/productdetail/:_id', (req, res) => {
  const _id = req.params._id
  let REVIEW_DATA = req.body
  REVIEW_DATA.created = new Date();

  REVIEW.find({ relation: _id }, (err, data) => {
    if (data.length > 0) {
      REVIEW.findOneAndUpdate(
        {
          relation: _id
        },
        {
          $push: {
            review_list: REVIEW_DATA
          }
        },
        success => {
          console.log('success')
        }
      )
    } else {
      const ADD_REVIEW = new REVIEW({
        relation: _id,
        review_list: {
          author: REVIEW_DATA.author,
          cotent: REVIEW_DATA.content,
          created: REVIEW_DATA.created
        }
      })
      ADD_REVIEW.save(err => {
        if (err) {
          console.error(err)
          res.json({ result: 0 })
          return
        } else {
          console.log('success')
        }
        res.end()
      })
    }
  })
})

router.get('/productdetail/review')

module.exports = router
