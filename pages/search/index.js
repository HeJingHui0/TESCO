import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    searchList: [],
    isBtnShow: false,
    inputValue: ''
  },
  timeId: -1,
  handleInput(e) {
    const {value} = e.detail
    if(!value.trim()) {
      this.setData({
        searchList: [],
        isBtnShow: false
      })
      return
    }
    this.setData({
      isBtnShow: true
    })
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.getSearchList(value)
    }, 1000);
  },
  async getSearchList(query) {
    const searchList = await request({
      url: '/goods/qsearch',
      data: {query}
    })
    this.setData({
      searchList
    })
  },
  handleCancel() {
    this.setData({
      searchList: [],
      isBtnShow: false,
      inputValue: ''
    })
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