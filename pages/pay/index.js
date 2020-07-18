import {getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment} from '../../utils/asyncWX.js'
import regeneratorRuntime from "../../lib/runtime/runtime"
import { request } from "../../request/index.js"
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(item => item.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  async handlePay() {
    try {
      const token = wx.getStorageSync('token') 
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return
      }
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      let cart = this.data.cart
      let goodsList = []
      cart.forEach(item => goodsList.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      }))
      const orderParams = {order_price, consignee_addr, goodsList}
      const {order_id} = await request({
        url: '/my/orders/create',
        method: 'post',
        data: orderParams,
      })
      const {pay} = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'post',
        data: {order_id},
      })
      await requestPayment(pay)
      const result = await request({
        url: '/my/orders/chkOrder',
        method: 'post',
        data: {order_id},
      })
      await showToast({title: '支付成功'})
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(item => !item.checked)
      wx.setStorageSync('cart', newCart)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (error) {
      await showToast({title: '支付失败'})
    }
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