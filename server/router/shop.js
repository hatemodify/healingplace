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

router.get('/addProduct/:shopid', (req, res) =>{
  SHOP.find({shop_id:req.params.shopid} , (err, data) => {
    res.send(data[0])
  })
})

module.exports = router;
