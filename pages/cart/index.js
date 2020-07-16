import {getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWX.js'
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
  async handleAddress() {
    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  handleChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(item => item.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.setCart(cart)
  },
  setCart(cart) {
    const allChecked = cart.length ? cart.every(item => item.checked) : false
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      if(item.checked) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  handleAllChange() {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(item => item.checked = allChecked)
    this.setCart(cart)
  },
  async handleNumChange(e) {
    const {id, operation} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(item => item.goods_id === id)
    if(cart[index].num === 1 && operation === -1) {
      const res = await showModal({content: '是否删除该商品'})
      if(res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  async handlePay() {
    const {address, totalNum} = this.data
    if(!address.userName) {
      await showToast({title: '请选择收获地址'})
      return 
    }else if(!totalNum) {
      await showToast({title: '请选择商品'})
      return
    }else {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
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