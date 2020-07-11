import { request } from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList()
  },
  getSwiperList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(result => {
      this.setData({ 
        swiperList: result.data.message
      })
    })
  },
  getCateList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    .then(result => {
      this.setData({ 
        cateList: result.data.message
      })
    })
  },
  getFloorList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    .then(result => {
      this.setData({ 
        floorList: result.data.message
      })
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  