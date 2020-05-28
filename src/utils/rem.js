window.onload = function () {
  getRem(720, 100)
}
window.onresize = function () {
  getRem(720, 100)
}
function getRem (pwidth, prem) {
  const html = document.getElementsByTagName('html')[0]
  const oWidth = document.body.clientWidth || document.documentElement.clientWidth
  html.style.fontSize = oWidth / pwidth * prem + 'px'
}
