const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const DB_INFO = require('./dbsetting')
const http = require('http')
const https = require('https')
const path = require('path')
const methodOverride = require('method-override')
const SHOP_MODEL = require('./models/shop')
const PRODUCT_MODEL = require('./models/product')
const fs = require('fs')

mongoose.connect(
  DB_INFO,
  { useNewUrlParser: true }
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', callbak => {
  console.log('db connection success')
})

const app = express()

// app.set("view engine", "html");

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(morgan('combined'))
app.use(
  bodyParser.json({
    limit: '50mb'
  })
)
app.use(cors())
app.use('/shop', require('./router/shop'))
app.use('/user', require('./router/user'))
app.use('/product', require('./router/product'))
// app.listen(process.env.PORT || 9998)

// http.createServer(app).listen(app.get('port'), function() {
//   console.log('server started' + app.get('port'));
//   // connectionDb();
// });

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https.createServer(options, app).listen(9998, function () {
  console.log('Https server listening on port ' + 9998)
})

app.post('/dummy', (req, res) => {
  console.log(req.body.shopName)
  const add_shop = new SHOP_MODEL({
    shop_name: req.body.shopName,
    region: req.body.region,
    shop_category: req.body.shopCategory,
    shop_address: req.body.shopAddress
  })
  add_shop.save(err => {
    if (err) {
      console.error(err)
      res.json({
        result: 0
      })
      return
    }
    res.end()
  })
})

app.get('/dummy', (req, res) => {
  SHOP_MODEL.find({}, 'shop_name shop_address', (err, addr) => {
    if (err) {
      console.log(err)
    }

    // addr.forEach(item => {
    //   item.shop_address.length > 5 ? temp.push(item) : addr
    // })

    let temp = addr.map(item => {
      if (!item.shop_address) {
        return item
      }
    })
    res.send({
      temp
    })
  })
})

app.get('/near/:lat/:lng', (req, res) => {
  const lng = Number(req.params.lng)
  const lat = Number(req.params.lat)

  // SHOP_MODEL.aggregate(
  //   [
  //     {
  //       $geoNear: {
  //         near: {
  //           type: 'Point',
  //           coordinates: [lng, lat]
  //         },
  //         distanceField: 'dist.calculated',
  //         maxDistance: 700,
  //         spherical: true
  //       }
  //     },
  //     { $limit: 50 }
  //   ],
  //   (err, data) => {
  //     if (err) throw err
  //     return res.send(data)
  //   }
  // )
  SHOP_MODEL.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 0.5 * 6378.1
      }
    }
  })
    .populate('review')
    .then(data => {
      res.send(data)
    })
})

// http.createServer(app).listen(port1, function () {
//   console.log("Http server listening on port " + port1);
// });
