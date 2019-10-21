// pages/me/collectmusic/collectmusic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       musicList:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var musicList =wx.getStorageSync("collect");
    var loginMes = wx.getStorageSync("loginMes");
    var userId = loginMes.profile.userId;
    var collectMusicUrl = app.globalData.musicBase + "/user/playlist?uid=" + userId;
    
    wx.setNavigationBarTitle({
      title: "我的歌单"
    })
   if(musicList){
     this.dataset({
       musicList:musicList
     })
   }else{
     this.getCollectMusicData(collectMusicUrl);
   }
  }, 
getCollectMusicData:function(url){
  var that =this;
   wx.request({
     url: url,
     success:(res)=>{
       console.log(res)
       that.processMusicListData(res.data);
     },
     fail:(error)=>{
       console.log(error)
     }
   })
},
processMusicListData:function(data){
  var musicList=[];
  for(var idx in data.playlist){
    var playlist = data.playlist[idx];
    var name = playlist.name;
    var temp = {
      name :name,
      coverImgUrl :playlist.coverImgUrl,
      createTime :playlist.createTime,
      playListId : playlist.id,
      creatorName: playlist.creator.nickname,
      description:playlist.description,
      musicCount:playlist.trackCount,
    }
    musicList.push(temp)
  }
 this.setData({
   musicList : musicList
 })
 wx.setStorageSync("collectMusic",musicList)
},
onTapToMusicListDetail:function(e){
   var id = e.currentTarget.dataset.musicListId;
   wx.navigateTo({
     url: 'musiclistdetail/musiclistdetail?id='+id,
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
    var loginMes = wx.getStorageSync("loginMes");
    var userId = loginMes.profile.userId;
    var collectMusicUrl = app.globalData.musicBase + "/user/playlist?uid=" + userId;
    this.getCollectMusicData(collectMusicUrl);
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