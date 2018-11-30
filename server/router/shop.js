const express = require('express');
const router = express.Router();
const SHOP = require('../models/shop');
const PRODUCT = require('../models/product');

router.post('/addShop', (req, res) => {
  const NEW_SHOP = new SHOP({
    shop_id: req.body.shopId,
    shop_name: req.body.shopName,
    shop_password: req.body.password,
    shop_address: req.body.address,
    shop_phone_number: req.body.phone1,
    cell_phone_number: req.body.phone2,
    shop_personal_day: req.body.personalDay,
    shop_category: req.body.category,
    shop_level: req.body.level
  });

  NEW_SHOP.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    console.log(res);
    res.end();
  });
});


router.post('/addProduct', (req, res)=>{
  const PRODUCT_DATA = req.body;

  const NEW_PRODUCT = new PRODUCT({
    shop_id: PRODUCT_DATA.shopId,
    title:PRODUCT_DATA.title,
    reservation:PRODUCT_DATA.reservation,
    price_data:PRODUCT_DATA.priceData,
    thumbnail:PRODUCT_DATA.thumbnail,
    detail:PRODUCT_DATA.detail,
  });

  NEW_PRODUCT.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }else{
      console.log('success')
    }

    res.end();
  });
});

module.exports = router;
