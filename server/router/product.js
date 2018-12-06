const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/product');
const SHOP = require('../models/shop');

router.post('/addProduct', (req, res) => {
  const PRODUCT_DATA = req.body;
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
  });

  NEW_PRODUCT.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    } else {
      console.log('success');
    }
    res.end();
  });
});

router.get('/productlist', (req, res) => {
  PRODUCT.find({}, (err, data) => {
    res.send(data);
  });
});

router.get('/productdetail/:_id', (req, res) => {
  console.log(req.params._id);
  PRODUCT.find({ _id: req.params._id }, (err, productData) => {
    res.send(productData[0]);
  });
});

module.exports = router;
