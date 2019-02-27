import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  numComma: num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  convertTime: time => {
    const year = time.substr(0, 4)
    const month = time.substr(4, 2) - 1
    const day = time.substr(6, 2)
    const hour = time.substr(8, 2)
    const min = time.substr(10, 2)
    return new Date(year, month, day, hour, min)
  },
  fixedNum: num => {
    return num.toFixed(1)
  },
  // imgPath: imageName => {
  //   return require(`@/upload/thumb/${imageName}`)
  // }
  sortDesc: (data, key1, key2) => {
    data.sort((a, b) =>
      b[key1][key2] > a[key1][key2] ? 1 : a[key1][key2] > b[key1][key2] ? -1 : 0
    )
  },
  sortAsc: (data, key1, key2) => {
    data.sort((a, b) =>
      b[key1][key2] < a[key1][key2] ? 1 : a[key1][key2] < b[key1][key2] ? -1 : 0
    )
  },
  loginSuccess: (googleUser, login) => {
    console.log(googleUser)
    axios
      .post(
        `https://dev.local.com:9998/user/loginProcess/`,
        googleUser.getBasicProfile()
      )
      .then(res => {
        this.userLogin(res.data.Eea)
        localStorage.Eea = res.data.Eea
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  },
  loginFail: googleUser => {
    console.log(googleUser)
    console.log(googleUser.getBasicProfile())
  }
}
