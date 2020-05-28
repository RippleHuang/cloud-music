export const imgLoadingAll = (pics) => {
  const picsAll = pics.map((imgurl) => {
    imgurl = imgurl + '?v=' + Math.random() // 仅是为了区分下不同的图片链接
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imgurl
      img.onload = () => resolve(imgurl)
      img.onerror = () => reject(new Error(imgurl + ' load error'))
    })
  })
  Promise.all(picsAll).then(() => {
    console.log('load all success')
  }).catch((e) => {
    console.log(e)
  })
}
