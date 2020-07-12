import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if(!Cates) {
      this.getCateList()
    }else {
      if(Date.now() - Cates.time > 1000 * 10) {
        this.getCateList()
      }else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCateList() {
    // request({url : "/categories"})
    // .then(result => {
    //   this.Cates = result.data.message;
    //   wx.setStorageSync('cates', {
    //     time: Date.now(),
    //     data: this.Cates
    //   })
    //   let leftMenuList = this.Cates.map(item => item.cat_name);
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const result = await request({url : "/categories"});
    this.Cates = result;
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })
    let leftMenuList = this.Cates.map(item => item.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    let rightContent = this.Cates[e.currentTarget.dataset.index].children;
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      rightContent,
      scrollTop: 0
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