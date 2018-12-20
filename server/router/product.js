const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PRODUCT = require('../models/product');
const SHOP = require('../models/shop');
const REVIEW = require('../models/review');
const utils = require('../utils');
const multer = require('multer');
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination:(req,file, cb) =>{
    cb(null, '../client/upload/thumb')
  },
  filename: (req,file,cb)=>{
    if(file){
      crypto.pseudoRandomBytes(4, function(err, raw) {
        if (err) return cb(err);
        cb(null, raw.toString("hex") + file.originalname);
      });
    }
  }
});

const upload = multer({storage:storage});

router.post('/addProduct', upload.single('thumbnail'), (req, res) => {
  

  const PRODUCT_DATA = req.body
  let NEW_PRODUCT = new PRODUCT({
    shop_id: PRODUCT_DATA.shopId,
    title: PRODUCT_DATA.title,
    reservation: PRODUCT_DATA.reservation,
    price_data: PRODUCT_DATA.priceData,
    thumbnail: req.file,
    shop_name: PRODUCT_DATA.shop_name,
    detail: PRODUCT_DATA.detail,
    shop_address: PRODUCT_DATA.shop_address,
    shop_personal_day: PRODUCT_DATA.shop_personal_day,
    terms1: PRODUCT_DATA.terms1,  
  });
  const ADD_REVIEW = new REVIEW({
    product_id: NEW_PRODUCT._id,
  });

  NEW_PRODUCT.review = ADD_REVIEW._id;
  NEW_PRODUCT.save(err => {
    if (err) {
      return (err)
    }
    console.log('success')
  })
  ADD_REVIEW.save();
  res.end()
});

router.get('/productlist/:type/:value', (req, res) => {
  let obj = {}
  obj[req.params['type']] = req.params['value']
  PRODUCT.find(obj, (err, data) => {
    res.send(data)
  })
});
router.get('/productlist', (req, res) => {
  PRODUCT.find({}, (err, data) => {
    res.send(data)
  })
});

router.get('/productdetail/:_id', (req, res) => {
  const ID = req.params._id
  PRODUCT.findOne({ _id: ID })
  .populate('review').then(data =>{
    res.send(data)
  })
});

router.post('/productdetail/:_id', (req, res) => {
  const _id = req.params._id
  const REVIEW_DATA = req.body
  REVIEW_DATA.created = utils.getDate(new Date())

  REVIEW.findOneAndUpdate(
    {
      product_id: _id
    },
    {
      $push: {
        review_list: REVIEW_DATA
      }
    },
    {
      upsert: true
    },
    () => {
      const ADD_REVIEW = new REVIEW({
        product_id: _id,
        review_list: {
          author: REVIEW_DATA.author,
          content: REVIEW_DATA.content,
          created: REVIEW_DATA.created
        }
      })
    }
  )
  res.send()
});
module.exports = router
