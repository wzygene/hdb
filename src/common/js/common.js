const baseUrl = ''
// const baseUrl = 'http://test.customer.adxiaoguo.com'
function formatDate (date) {
  if (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0')
  } else {
    return ''
  }
}

export { formatDate, baseUrl }
