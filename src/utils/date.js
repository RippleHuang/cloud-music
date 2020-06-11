// 第一个参数为日期，第二个参数为年月日分割格式 '/'或'-'
export const format = (Date, str) => {
  const obj = {
    Y: Date.getFullYear(),
    M: Date.getMonth() + 1,
    D: Date.getDate(),
    H: Date.getHours(),
    Mi: Date.getMinutes(),
    S: Date.getSeconds()
  }
  // 位数不足两位补全0
  function supplement (nn) {
    nn = nn < 10 ? '0' + nn : nn
    return nn
  }
  // 拼接时间 hh:mm:ss
  const time = ' ' + supplement(obj.H) + ':' + supplement(obj.Mi) + ':' + supplement(obj.S)
  // yyyy-mm-dd
  if (str.indexOf('-') > -1) {
    return obj.Y + '-' + supplement(obj.M) + '-' + supplement(obj.D) + time
  }
  // yyyy/mm/dd
  if (str.indexOf('/') > -1) {
    return obj.Y + '/' + supplement(obj.M) + '/' + supplement(obj.D) + time
  }
}
