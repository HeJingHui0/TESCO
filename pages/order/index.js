import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    Tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退款',
        isActive: false
      }
    ],
    orderList: []
  },
  onShow() {
    const token = wx.getStorageSync('token')
    // if(!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   })
    //   return
    // }
    let pages = getCurrentPages()
    let {type} = pages[pages.length - 1].options
    this.changeTitleByIndex(type - 1)
    this.getOrderList(type)
  },
  changeTitleByIndex(i) {
    let {Tabs} = this.data
    Tabs.forEach((item, index) => index === i ? item.isActive = true : item.isActive = false);
    this.setData({
      Tabs
    })
  },
  handleItemTap(e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    this.getOrderList(index + 1)
  },
  async getOrderList(type) {
    const result = await request({
      url: '/my/orders/all',
      data: {type}
    })
    const orderList = result.orders.map(item => ({
      ...item,
      create_time_cn: new Date(item.create_time * 1000).toLocaleString()
    }))
    this.setData({
      orderList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})