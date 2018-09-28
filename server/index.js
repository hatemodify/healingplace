const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const DB_INFO = require('./dbsetting');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override');

// mongoose.connect(
//   DB_INFO,
//   { useNewUrlParser: true }
// );
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));

// db.once('open', callbak => {
//   console.log('db connection success');
// });

const app = express();

// app.set("view engine", "html");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 9000);

// http.createServer(app).listen(app.get('port'), function() {
//   console.log('server started' + app.get('port'));
//   // connectionDb();
// });

app.get('/', (req, res) => {
  res.render('index.html', {
    title: 'MAD',
    arr: [1, 2, 3, 4, 5, 6, 7]
  });
  console.log(res);
});
