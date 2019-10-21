// pages/me/me.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      loginMes:"",  
      isLogin:false,
      defaultAvatarUrl:"/images/icon/defaultHeader.png"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var loginMes = wx.getStorageSync("loginMes")
    var profile = loginMes.profile
    if(loginMes){
    this.setData({
      loginMes:profile,
      isLogin:true
    })
    }else{
     return null;
    }
    console.log(loginMes)
    wx.setNavigationBarTitle({
      title:profile.nickname,
    })
  },
onTapToCollectMusic:function(){
 wx.navigateTo({
   url: 'collectmusic/collectmusic',
 })
},
loginOut:function(){
  var that =this
  wx.removeStorage({
    key: 'loginMes',
    success: function (res) {
      that.setData({
        isLogin: false
      })
      wx.showToast({
        title: '退出成功...',
        duration:2000
      })
     
    },
  })
  
},
onTapToLogin:function(){
   wx.navigateTo({
     url: '../login/login',
   })
},
onTapToDetail:function(){
  wx.navigateTo({
    url: 'medetail/medetail',
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
    this.onLoad()
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