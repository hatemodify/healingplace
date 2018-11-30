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





module.exports = router;