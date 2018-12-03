const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/product');
const SHOP = require('../models/shop');


router.post('/addProduct', (req, res)=>{
  const shopAddr  = addr(req);  

  const PRODUCT_DATA = req.body;  
  const NEW_PRODUCT = new PRODUCT({
    shop_id: PRODUCT_DATA.shopId,
    title:PRODUCT_DATA.title,
    reservation:PRODUCT_DATA.reservation,
    price_data:PRODUCT_DATA.priceData,
    thumbnail:PRODUCT_DATA.thumbnail,
    detail:PRODUCT_DATA.detail,
    shop_address: shopAddr
  });

  NEW_PRODUCT.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }else{
      console.log('success');
    }
    res.end();
  });
});

function addr(req){
  SHOP.find({shop_id:req.body.shopId},(err,data) =>{
    console.log(data[0].shop_address)
    return data[0].shop_address;
  });
}


module.exports = router;
