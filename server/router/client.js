const express = require('express');
const router  = express.Router();
const PRODUCT = require('../models/product');

router.get('/productlist', (req, res)=>{
  PRODUCT.find({},(err,data) =>{
    res.send({
      data
    })
  });
})

router.get('/productdetail/:_id', (req, res)=>{
  console.log(req.params._id)
  PRODUCT.find(
    {_id:req.params._id},
    (err,productData) =>{
      console.log(productData);
    res.send({
      productData
    })
  });
})




module.exports = router;