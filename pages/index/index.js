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
    //   url: '/home/swiperdata',
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
    request({url: '/home/swiperdata'})
    .then(result => {
      this.setData({ 
        swiperList: result
      })
    })
  },
  getCateList() {
    request({url: '/home/catitems'})
    .then(result => {
      this.setData({ 
        cateList: result
      })
    })
  },
  getFloorList() {
    request({url: '/home/floordata'})
    .then(result => {
      this.setData({ 
        floorList: result
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
  