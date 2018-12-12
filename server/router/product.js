const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const PRODUCT = require('../models/product')
const SHOP = require('../models/shop')
const REVIEW = require('../models/review')
const utils = require('../utils')

router.post('/addProduct', (req, res) => {
  const PRODUCT_DATA = req.body
  const NEW_PRODUCT = new PRODUCT({
    _id: new mongoose.Types.ObjectId(),
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
  const ADD_REVIEW = new REVIEW({product_id: NEW_PRODUCT._id})
  
  NEW_PRODUCT.save(err => {
    if (err) {
      return handleError(err);
    } 
    
    ADD_REVIEW.save();
    console.log('success')
  })


  res.end()
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
  const ID = req.params._id;
  PRODUCT.findOne({ _id: ID }).populate('product_id').then( data => {
    console.log(data)
    res.send(data);
  })
    //   REVIEW.findOne({ product_id: ID }).populate('product_id').then(data =>{
    //   res.send({
    //     data
    //   })
    // })
})

router.post('/productdetail/:_id', (req, res) => {
  const _id = req.params._id
  const REVIEW_DATA = req.body;
  REVIEW_DATA.created = utils.getDate(new Date());
  console.log(_id, REVIEW_DATA)
  REVIEW.findOneAndUpdate(
    {
      product_id: _id
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
  // REVIEW.findOne({ product_id: _id }, (err, data) => {
  //   if (data.length > 0) {
  //     REVIEW.findOneAndUpdate(
  //       {
  //         product_id: _id
  //       },
  //       {
  //         $push: {
  //           review_list: REVIEW_DATA
  //         }
  //       },
  //       success => {
  //         console.log('success')
  //       }
  //     )
  //   } else {
  //     const ADD_REVIEW = new REVIEW({
  //       review_list: {
  //         author: REVIEW_DATA.author,
  //         content: REVIEW_DATA.content,
  //         created: REVIEW_DATA.created
  //       }
  //     })
  //     ADD_REVIEW.save(err => {
  //       if (err) {
  //         console.error(err)
  //         res.json({ result: 0 })
  //         return
  //       } else {
  //         console.log('success')
  //       }
  //       res.end()
  //     })
  //   }
  // })
})
module.exports = router