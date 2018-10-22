const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const DB_INFO = require('./dbsetting');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override');

const SHOP_MODEL = require('./models/shop');
mongoose.connect(
  DB_INFO,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', callbak => {
  console.log('db connection success');
});

const app = express();

// app.set("view engine", "html");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 9998);

// http.createServer(app).listen(app.get('port'), function() {
//   console.log('server started' + app.get('port'));
//   // connectionDb();
// });

app.post('/dummy', (req, res) => {
  console.log(req.body.shopName);
  const add_shop = new SHOP_MODEL({
    shop_name: req.body.shopName,
    region: req.body.region,
    shop_category: req.body.shopCategory,
    shop_address: req.body.shopAddress
  });
  add_shop.save(err => {
    if (err) {
      console.error(err);
      res.json({
        result: 0
      });
      return;
    }
    res.end();
  });
});

app.get('/dummy', (req, res) => {
  SHOP_MODEL.find({}, 'shop_name shop_address', (err, addr) => {
    if (err) {
      console.log(err);
    }
    res.send({
      addr
    });
  });
});
