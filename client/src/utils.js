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
  toFixed: num => {
    return num.toFixed(1)
  },
  // imgPath: imageName => {
  //   return require(`@/upload/thumb/${imageName}`)
  // }
  sortDesc (data, key1, key2) {
    console.log(data)
    data.sort((a, b) =>
      b[key1][key2] > a[key1][key2] ? 1 : a[key1][key2] > b[key1][key2] ? -1 : 0
    )
  },
  sortAsc (data, key1, key2) {
    data.sort((a, b) =>
      b[key1][key2] < a[key1][key2] ? 1 : a[key1][key2] < b[key1][key2] ? -1 : 0
    )
  }
}
