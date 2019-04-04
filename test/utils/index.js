import axios from 'axios'

export const numComma = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const convertTime = time => {
  const year = time.substr(0, 4)
  const month = time.substr(4, 2) - 1
  const day = time.substr(6, 2)
  const hour = time.substr(8, 2)
  const min = time.substr(10, 2)
  return new Date(year, month, day, hour, min)
}
export const fixedNum = num => {
  return num.toFixed(1)
}

export const sortDesc = (data, key1, key2) => {
  data.sort((a, b) =>
    b[key1][key2] > a[key1][key2] ? 1 : a[key1][key2] > b[key1][key2] ? -1 : 0
  )
}
export const sortAsc = (data, key1, key2) => {
  data.sort((a, b) =>
    b[key1][key2] < a[key1][key2] ? 1 : a[key1][key2] < b[key1][key2] ? -1 : 0
  )
}
export const loginSuccess = (googleUser, login) => {
  axios
    .post(
      `https://dev.local.com:9998/user/loginProcess/`,
      googleUser.getBasicProfile()
    )
    .then(res => {
      this.userLogin(res.data.Eea)
      localStorage.Eea = res.data.Eea
      // this.$router.push('/')
    })
    .catch(err => {
      console.log(err)
    })
}
export const loginFail = googleUser => {
  console.log(googleUser)
  console.log(googleUser.getBasicProfile())
}
