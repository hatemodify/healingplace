const express = require('express')
const router = express.Router()
const PRODUCT = require('../models/product')
const USER = require('../models/user')

// router.post('/loginProcess', (req, res) => {
//   const userData = req.body
//   USER.findOne({ Eea: userData.Eea }, (err, user) => {
//     if (!user) {
//       const NEW_USER = new USER({
//         Eea: userData.Eea,
//         name: userData.ig,
//         email: userData.U3
//       })
//       NEW_USER.save(err => {
//         if (err) {
//           return err
//         }
//       })
//     } else {
//       console.log('login success')
//       res.send({ Eea: user.Eea })
//     }
//   })
// })
router.post('/loginProcess', (req, res) => {
  const userData = req.body
  USER.findOne({ Eea: userData.Eea }, (err, user) => {
    if (!user) {
      res.send()
    } else {
      console.log('login success')
      res.send({ userInfo: { Eea: user.Eea, userName: user.user_name } })
    }
  })
})

router.get('/userInfo/:_id', (req, res) => {
  USER.findOne({ Eea: req.params._id }, (err, user) => {
    res.send(user)
  })
})

module.exports = router
