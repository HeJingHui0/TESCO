import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    Tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  onLoad: function (options) {
    this.queryParams.cid = options.cid || '';
    this.queryParams.query = options.query || '';
    this.getGoodsList()
  },
  async getGoodsList() {
    const result = await request({url: '/goods/search', data: this.queryParams})
    this.totalPages = Math.ceil(result.total / this.queryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    wx.stopPullDownRefresh()
  },
  handleItemTap(e) {
    let {Tabs} = this.data;
    Tabs.forEach((item, index) => index === e.detail.index ? item.isActive = true : item.isActive = false);
    this.setData({
      Tabs
    })
  },
  onReachBottom() {
    if(this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '亲，已经到底了',
      })
    }else {
      this.queryParams.pagenum ++;
      this.getGoodsList()
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1;
    this.getGoodsList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})