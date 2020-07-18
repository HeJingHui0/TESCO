import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {login, showToast} from "../../utils/asyncWX"
Page({
  data: {

  },
  onLoad: function (options) {

  },
  async getUserInfo(e) {
    // 个人账号无法获取支付权限,这里将isTrue设置为false
    const isTrue = false
    try {
      const {encryptedData, iv, rawData, signature} = e.detail
      const {code} = await login()
      const loginParams = {
        encryptedData,
        iv,
        rawData,
        signature,
        code
      }
      if(isTrue) {
        const {token} = await request({
          url: '/users/wxlogin',
          method: 'post',
          data: loginParams
        })
        wx.setStorageSync('token', token)
        wx.navigateBack({
          delta: 1,
        })
      }else {
        wx.navigateBack({
          delta: 1,
        })
        await showToast({title: '个人账号无支付权限'})
      }
    } catch (error) {
      
    }
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