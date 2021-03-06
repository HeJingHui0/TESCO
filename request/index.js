let ajaxTime = 0
export const request = (params) => {
  let header = {...params.header}
  if(params.url.includes('/my/')) {
    header['Authorization'] = wx.getStorageSync('token')
  }
  ajaxTime ++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header,
      url: baseURL + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTime --;
        if(!ajaxTime){
          wx.hideLoading()
        }
      }
    })
  })
}