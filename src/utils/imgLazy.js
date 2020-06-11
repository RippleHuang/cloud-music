function Limg () {
  var viewHeight = document.documentElement.clientHeight
  // 获取全部带有data-src的img
  var limg = document.querySelectorAll('img[data-src]')
  // Array.prototype.forEach.call()是一种快速的方法访问forEach，并将空数组的this换成想要遍历的list
  Array.prototype.forEach.call(limg, function (item, index) {
    var rect
    // 假如data-src为空跳出
    if (item.getAttribute('data-src') === '') {
      return false
    }
    // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
    rect = item.getBoundingClientRect()
    // 图片一进入可视区，动态加载
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      (function () {
        const img = new Image()
        img.src = item.getAttribute('data-src')
        item.src = img.src
        // 给图片添加过渡效果，让图片显示
        let j = 0
        setInterval(function () {
          j += 0.15
          if (j <= 1) {
            item.style.opacity = j
            return false
          }
        }, 100)
        // 去除data-src
        item.removeAttribute('data-src')
      })()
    }
  })
}
window.onload = function () {
  const img = document.querySelectorAll('img[data-src]')
  for (let i = 0; i < img.length; i++) {
    img[i].style.opacity = '0'
  }
  Limg()
}
window.onscroll = function () {
  Limg()
}
