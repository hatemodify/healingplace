module.exports = {
  getDate(dateObj) {
    if (dateObj instanceof Date)
      return (
        dateObj.getFullYear() +
        '-' +
        this.get2digits(dateObj.getMonth() + 1) +
        '-' +
        this.get2digits(dateObj.getDate())
      );
  },
  
  get2digits(num) {
    return ('0' + num).slice(-2);
  },

  convertDate(date){
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }
}