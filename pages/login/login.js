// pages/me/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    phoneNum:"",
    passwd:""
  },
  phoneNumInput:function(e){
    var phoneNum = e.detail.value;
    if(phoneNum!=""){
      this.setData({
        phoneNum:phoneNum
      })
    }
  },
  passwdInput:function(e){
   var passwd = e.detail.value;
   if(passwd!="" && this.data.phoneNum!=""){
     this.setData({
        passwd:passwd,
        disabled:false,
       btnstate:"warn"
     })
   }else{
    this.setData({
      disabled:true,
      btnstate:"default"
    })
   }
  },
  login:function(){
    var that = this;
     var phoneNum = this.data.phoneNum;
     var passwd = this.data.passwd;
     var that = this;
     var loginUrl = app.globalData.musicBase+"/login/cellphone?"+"phone="+phoneNum+"&password="+passwd
    wx.showToast({
      title: '登录中...',
      icon: 'loading'
    })
     wx.request({
       method:'GET',
       url:loginUrl,
       success:function(res){
         console.log(res.data)
         wx.setStorageSync("loginMes", res.data)
         wx.switchTab({
           url :"../me/me"
         })
         
       },
       fail:function(error){
         console.log(error)
       }
     })
    
  },
  onTapToIndex:function(){
     wx.switchTab({
       url: '../index/index',
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "登录云音乐",
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