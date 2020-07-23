// pages/feedback/index.js
Page({
  data: {
    Tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '我要投诉',
        isActive: false
      }
    ],
    imgList: [],
    content: ''
  },
  upLoadImgs: [],
  handleItemTap(e) {
    let {Tabs} = this.data;
    Tabs.forEach((item, index) => index === e.detail.index ? item.isActive = true : item.isActive = false);
    this.setData({
      Tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: result => {
        this.setData({
          imgList: [...this.data.imgList, ...result.tempFilePaths]
        })
      }
    })
  },
  handleRemoveImg(e) {
    const {index} = e.currentTarget.dataset
    let {imgList} = this.data
    imgList.splice(index, 1)
    this.setData({
      imgList
    })
  },
  hanldeInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  handleCommit() {
    const {content, imgList} = this.data
    if(!content.trim()) {
      wx.showToast({
        title: '请输入遇到的问题',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    if(imgList.length !== 0) {
      imgList.forEach((item, index) => {
        wx.uploadFile({
          filePath: item,
          name: 'img',
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          formData: {},
          success: result => {
            let imgURL = JSON.parse(result.data).url
            this.upLoadImgs.push(imgURL)
            if(index === imgList.length - 1) {
              wx.hideLoading()
              this.setData({
                imgList: [],
                content: ''
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      })
    }else {
      wx.hideLoading()
      wx.navigateBack({
        delta: 1,
      })
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