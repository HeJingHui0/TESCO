import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    goodsDetail: {},
    isCollect: ''
  },
  goodsImage: {},
  onShow() {
    let pages = getCurrentPages()
    let options = pages[pages.length -1].options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id) {
    const result = await request({url: '/goods/detail', data: {goods_id}})
    this.goodsImage = result
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(item => item.goods_id === this.goodsImage.goods_id)
    this.setData({
      goodsDetail: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.pics
      },
      isCollect
    })
  },
  handlePrevewImage(e) {
    const urls = this.goodsImage.pics.map(item => item.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(item => item.goods_id === this.goodsImage.goods_id)
    if(index === -1) {
      this.goodsImage.num = 1
      this.goodsImage.checked = true
      cart.push(this.goodsImage)
    }else {
      cart[index].num ++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  handleCollect() {
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(item => item.goods_id === this.goodsImage.goods_id)
    if(index !== -1) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      })
    }else {
      collect.push(this.goodsImage)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
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